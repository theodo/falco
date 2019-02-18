import os

import requests

from audits.models import Audit, AuditResults, AuditStatusHistory, AvailableStatuses
from celery import shared_task
from django.core.exceptions import ImproperlyConfigured


def format_wpt_json_results(data):
    return {
        "wpt_metric_first_view_tti": data["average"]["firstView"].get(
            "FirstInteractive"
        )
        or data["average"]["firstView"].get("LastInteractive"),
        "wpt_metric_repeat_view_tti": data["average"]["repeatView"].get(
            "FirstInteractive"
        )
        or data["average"]["repeatView"].get("LastInteractive"),
        "wpt_metric_first_view_speed_index": data["average"]["firstView"]["SpeedIndex"],
        "wpt_metric_repeat_view_speed_index": data["average"]["repeatView"][
            "SpeedIndex"
        ],
        "wpt_metric_first_view_first_paint": data["average"]["firstView"]["firstPaint"],
        "wpt_metric_repeat_view_first_paint": data["average"]["repeatView"][
            "firstPaint"
        ],
        "wpt_metric_first_view_first_meaningful_paint": data["average"]["firstView"][
            "firstMeaningfulPaint"
        ],
        "wpt_metric_repeat_view_first_meaningful_paint": data["average"]["repeatView"][
            "firstMeaningfulPaint"
        ],
        "wpt_metric_first_view_first_contentful_paint": data["average"]["firstView"][
            "firstContentfulPaint"
        ],
        "wpt_metric_repeat_view_first_contentful_paint": data["average"]["repeatView"][
            "firstContentfulPaint"
        ],
        "wpt_metric_first_view_load_time": data["average"]["firstView"]["loadTime"],
        "wpt_metric_repeat_view_load_time": data["average"]["repeatView"]["loadTime"],
        "wpt_metric_first_view_time_to_first_byte": data["average"]["firstView"][
            "TTFB"
        ],
        "wpt_metric_repeat_view_time_to_first_byte": data["average"]["repeatView"][
            "TTFB"
        ],
        "wpt_metric_lighthouse_performance": data["average"]["firstView"][
            "lighthouse.Performance"
        ],
    }


@shared_task
def request_audit(audit_uuid):
    webpagetest_api_key = os.environ.get("WEBPAGETEST_API_KEY")
    if webpagetest_api_key is None:
        raise (
            ImproperlyConfigured(
                """
            Please provide a WebPageTest API Key under
            the WEBPAGETEST_API_KEY environment variable
        """
            )
        )

    audit = Audit.objects.get(uuid=audit_uuid)
    audit_status_requested = AuditStatusHistory(
        audit=audit, status=AvailableStatuses.REQUESTED.value
    )
    audit_status_requested.save()
    payload = {
        "url": audit.page.url,
        "f": "json",
        "lighthouse": 1,
        "k": webpagetest_api_key,
    }
    r = requests.post("http://www.webpagetest.org/runtest.php", params=payload)
    response = r.json()
    if r.status_code == requests.codes.ok:
        audit_status_pending = AuditStatusHistory(
            audit=audit,
            status=AvailableStatuses.PENDING.value,
            details=str(response["data"]),
        )
        audit_status_pending.save()
        poll_audit_results.apply_async(
            (audit_uuid, response["data"]["jsonUrl"]), countdown=15
        )
    else:
        audit_status_error = AuditStatusHistory(
            audit=audit,
            status=AvailableStatuses.ERROR.value,
            details=str(response["data"]),
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
        formatted_results = format_wpt_json_results(response["data"])
        audit_results = AuditResults(
            audit=audit,
            wpt_results_json_url=json_url,
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
        audit_status_success = AuditStatusHistory(
            audit=audit,
            status=AvailableStatuses.SUCCESS.value,
            details=(
                "Audit Successful! AuditResults uuid: %s" % str(audit_results.uuid)
            ),
        )
        audit_status_success.save()
