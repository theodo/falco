from urllib.parse import parse_qs, urlparse

import requests
import urllib

from audits.models import Audit, AuditResults, AuditStatusHistory, AvailableStatuses
from celery import shared_task
from projects.models import NetworkShapeOptions, Page


def format_wpt_json_results(data):
    return {
        "wpt_metric_first_view_tti": data["median"]["firstView"].get(
            "FirstInteractive"
        )
        or data["median"]["firstView"].get("LastInteractive"),
        "wpt_metric_repeat_view_tti": data["median"]["repeatView"].get(
            "FirstInteractive"
        )
        or data["median"]["repeatView"].get("LastInteractive"),
        "wpt_metric_first_view_speed_index": data["median"]["firstView"]["SpeedIndex"],
        "wpt_metric_repeat_view_speed_index": data["median"]["repeatView"][
            "SpeedIndex"
        ],
        "wpt_metric_first_view_first_paint": data["median"]["firstView"]["firstPaint"],
        "wpt_metric_repeat_view_first_paint": data["median"]["repeatView"][
            "firstPaint"
        ],
        "wpt_metric_first_view_first_meaningful_paint": data["median"][
            "firstView"
        ].get("firstMeaningfulPaint"),
        "wpt_metric_repeat_view_first_meaningful_paint": data["median"][
            "repeatView"
        ].get("firstMeaningfulPaint"),
        "wpt_metric_first_view_first_contentful_paint": data["median"][
            "firstView"
        ].get("firstContentfulPaint"),
        "wpt_metric_repeat_view_first_contentful_paint": data["median"][
            "repeatView"
        ].get("firstContentfulPaint"),
        "wpt_metric_first_view_load_time": data["median"]["firstView"]["loadTime"],
        "wpt_metric_repeat_view_load_time": data["median"]["repeatView"]["loadTime"],
        "wpt_metric_first_view_time_to_first_byte": data["median"]["firstView"][
            "TTFB"
        ],
        "wpt_metric_repeat_view_time_to_first_byte": data["median"]["repeatView"][
            "TTFB"
        ],
        "wpt_metric_lighthouse_performance": data["median"]["firstView"].get(
            "lighthouse.Performance"
        ),
        "screenshot_url": data["median"]["firstView"]["images"]["screenShot"],
    }


@shared_task
def request_audit(audit_uuid):
    audit = Audit.objects.get(uuid=audit_uuid)
    parameters = audit.parameters
    audit_status_requested = AuditStatusHistory(
        audit=audit, status=AvailableStatuses.REQUESTED.value
    )

    audit_status_requested.save()
    """
    See https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis
    for all available parameters in the WebPageTest API
    """
    payload = {
        "f": "json",
        "runs": 3,
        "video": 1,
        "mv": 1,
        "location": f"{parameters.location}:{parameters.browser}.{NetworkShapeOptions[parameters.network_shape].value}",
    }

    if audit.page is not None:
        payload["url"] = audit.page.url
        payload["lighthouse"] = 1
        payload["k"] = audit.page.project.wpt_api_key
    elif audit.script is not None:
        payload["script"] = urllib.parse.quote_plus(audit.script.script)
        payload["k"] = audit.script.project.wpt_api_key

    r = requests.post("http://www.webpagetest.org/runtest.php", params=payload)
    response = r.json()
    if response["statusCode"] == 200:
        audit_status_pending = AuditStatusHistory(
            audit=audit,
            status=AvailableStatuses.PENDING.value,
            details=str(response["data"]),
        )
        audit_status_pending.save()
        poll_audit_results.apply_async(
            (audit_uuid, response["data"]["jsonUrl"]), countdown=15
        )
    elif response["statusCode"] == 400:
        # Usually 400 errors come from exceeding the daily limit
        audit_status_error = AuditStatusHistory(
            audit=audit,
            status=AvailableStatuses.ERROR.value,
            details=str(response["statusText"]),
        )
        audit_status_error.save()
    else:
        audit_status_error = AuditStatusHistory(
            audit=audit,
            status=AvailableStatuses.ERROR.value,
            details=str(response.dumps()),
        )
        audit_status_error.save()


@shared_task
def poll_audit_results(audit_uuid, json_url):
    audit = Audit.objects.get(uuid=audit_uuid)
    r = requests.get(json_url)
    response = r.json()
    status_code = response.get("statusCode") or response["data"].get("statusCode")
    if status_code in [100, 101]:
        audit_status_pending = AuditStatusHistory(
            audit=audit,
            status=AvailableStatuses.PENDING.value,
            details=str(response["data"]["statusText"]),
        )
        audit_status_pending.save()
        poll_audit_results.apply_async((audit_uuid, json_url), countdown=15)
    elif status_code == 200:
        parsed_url = urlparse(json_url)
        test_id = parse_qs(parsed_url.query)["test"][0]
        wpt_results_user_url = f"http://www.webpagetest.org/result/{test_id}"
        formatted_results = format_wpt_json_results(response["data"])
        audit_results = AuditResults(
            audit=audit,
            wpt_results_json_url=json_url,
            wpt_results_user_url=wpt_results_user_url,
            wpt_metric_first_view_tti=formatted_results["wpt_metric_first_view_tti"],
            wpt_metric_repeat_view_tti=formatted_results["wpt_metric_repeat_view_tti"],
            wpt_metric_first_view_speed_index=formatted_results[
                "wpt_metric_first_view_speed_index"
            ],
            wpt_metric_repeat_view_speed_index=formatted_results[
                "wpt_metric_repeat_view_speed_index"
            ],
            wpt_metric_first_view_first_paint=formatted_results[
                "wpt_metric_first_view_first_paint"
            ],
            wpt_metric_repeat_view_first_paint=formatted_results[
                "wpt_metric_repeat_view_first_paint"
            ],
            wpt_metric_first_view_first_meaningful_paint=formatted_results[
                "wpt_metric_first_view_first_meaningful_paint"
            ],
            wpt_metric_repeat_view_first_meaningful_paint=formatted_results[
                "wpt_metric_repeat_view_first_meaningful_paint"
            ],
            wpt_metric_first_view_load_time=formatted_results[
                "wpt_metric_first_view_load_time"
            ],
            wpt_metric_repeat_view_load_time=formatted_results[
                "wpt_metric_repeat_view_load_time"
            ],
            wpt_metric_first_view_first_contentful_paint=formatted_results[
                "wpt_metric_first_view_first_contentful_paint"
            ],
            wpt_metric_repeat_view_first_contentful_paint=formatted_results[
                "wpt_metric_repeat_view_first_contentful_paint"
            ],
            wpt_metric_first_view_time_to_first_byte=formatted_results[
                "wpt_metric_first_view_time_to_first_byte"
            ],
            wpt_metric_repeat_view_time_to_first_byte=formatted_results[
                "wpt_metric_repeat_view_time_to_first_byte"
            ],
            wpt_metric_lighthouse_performance=formatted_results[
                "wpt_metric_lighthouse_performance"
            ],
        )
        audit_results.save()

        project = audit.page.project
        if project.screenshot_url is None or project.screenshot_url == "":
            project.screenshot_url = formatted_results["screenshot_url"]
            project.save()

        audit_status_success = AuditStatusHistory(
            audit=audit,
            status=AvailableStatuses.SUCCESS.value,
            details=(
                "Audit Successful! AuditResults uuid: %s" % str(audit_results.uuid)
            ),
        )
        audit_status_success.save()


@shared_task
def request_all_audits():
    pages = Page.objects.all().iterator()

    for page in pages:
        audit_parameters_list = page.project.audit_parameters_list.all()
        for audit_parameters in audit_parameters_list:
            audit = Audit(page=page, parameters=audit_parameters)
            audit.save()
            request_audit.delay(audit.uuid)
