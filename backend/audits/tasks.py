from urllib.parse import parse_qs, urlparse

import logging
import requests

from audits.wpt_utils.status_and_info_extracter import extract_status_and_info
from audits.models import Audit, AuditResults, AuditStatusHistory, AvailableStatuses
from celery import shared_task
from projects.models import NetworkShapeOptions, Page, Script, AvailableAuditParameters
from audits.wpt_utils.normalizer import (
    format_wpt_json_results_for_page,
    format_wpt_json_results_for_script,
)

# after a certain number of times receiving the exact same answer when polling audits results, we want to stop the polling and say that the audit has failed
MAX_POLL_SAME_RESPONSE_FROM_API = 50


@shared_task
def request_audit(audit_uuid):
    audit = Audit.objects.get(uuid=audit_uuid)
    parameters = audit.parameters
    AuditStatusHistory.objects.create(
        audit=audit,
        status=AvailableStatuses.REQUESTED.value,
        details="Audit requested, async task started",
    )

    """
    See https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis
    for all available parameters in the WebPageTest API
    """
    payload = {
        "f": "json",
        "runs": 3,
        "video": 1,
        "location": f"{parameters.configuration.location}:{parameters.configuration.browser}.{NetworkShapeOptions[parameters.network_shape].value}",
    }

    if audit.page is not None:
        payload["url"] = audit.page.url
        payload["lighthouse"] = 1
        payload["k"] = audit.page.project.wpt_api_key
        wpt_instance_url = audit.page.project.wpt_instance_url
    elif audit.script is not None:
        payload["script"] = audit.script.script
        payload["k"] = audit.script.project.wpt_api_key
        wpt_instance_url = audit.script.project.wpt_instance_url

    try:
        r = requests.post(f"{wpt_instance_url}/runtest.php", params=payload)
    except Exception as e:
        AuditStatusHistory.objects.create(
            audit=audit,
            status=AvailableStatuses.ERROR.value,
            details=f"Unable to create audit on host {wpt_instance_url}: request failed",
        )
        raise e
    response = r.json()
    if response["statusCode"] == 200:
        AuditStatusHistory.objects.create(
            audit=audit,
            status=AvailableStatuses.QUEUEING.value,
            details=str(response["data"]),
        )
        poll_audit_results.apply_async(
            (audit_uuid, response["data"]["jsonUrl"]), countdown=15
        )
    elif response["statusCode"] == 400:
        # Usually 400 errors come from empty script or exceeding the daily limit
        AuditStatusHistory.objects.create(
            audit=audit,
            status=AvailableStatuses.ERROR.value,
            details=str(response["statusText"]),
        )
    else:
        AuditStatusHistory.objects.create(
            audit=audit,
            status=AvailableStatuses.ERROR.value,
            details=str(response.dumps()),
        )


@shared_task
def poll_audit_results(audit_uuid, json_url, previous_api_response="", repeat_index=0):
    audit = Audit.objects.get(uuid=audit_uuid)
    try:
        r = requests.get(json_url)
        response = r.json()
        status_code = response.get("statusCode") or response["data"].get("statusCode")
    except Exception as e:
        AuditStatusHistory.objects.create(
            audit=audit,
            status=AvailableStatuses.ERROR.value,
            details=(
                f"Request failed while polling results from {json_url}. Audit uuid: {audit_uuid}"
            ),
        )
        raise e

    if repeat_index > MAX_POLL_SAME_RESPONSE_FROM_API:
        AuditStatusHistory.objects.create(
            audit=audit,
            status=AvailableStatuses.ERROR,
            details=f"Polled api returned the exact same reponse for {repeat_index}>{MAX_POLL_SAME_RESPONSE_FROM_API} times: {previous_api_response}",
        )

    if status_code in [100, 101]:
        api_response = str(response["data"]["statusText"])
        status, info = extract_status_and_info(api_response)
        AuditStatusHistory.objects.create(
            audit=audit, status=status, details=api_response, info=info
        )

        # when receiving too many times the exact same answer, we want to stop the polling
        if api_response == previous_api_response:
            repeat_index += 1
        else:
            repeat_index = 0

        poll_audit_results.apply_async(
            (audit_uuid, json_url, api_response, repeat_index), countdown=15
        )
    elif status_code == 200:
        if audit.page is not None:
            wpt_instance_url = audit.page.project.wpt_instance_url
        elif audit.script is not None:
            wpt_instance_url = audit.script.project.wpt_instance_url

        parsed_url = urlparse(json_url)
        test_id = parse_qs(parsed_url.query)["test"][0]
        wpt_results_user_url = f"{wpt_instance_url}/result/{test_id}"
        try:
            if audit.page is not None:
                project = audit.page.project
                formatted_results_array = format_wpt_json_results_for_page(
                    response["data"]
                )
            elif audit.script is not None:
                project = audit.script.project
                formatted_results_array = format_wpt_json_results_for_script(
                    response["data"]
                )
            for formatted_results in formatted_results_array:
                audit_results = AuditResults(
                    audit=audit,
                    wpt_results_json_url=json_url,
                    wpt_results_user_url=wpt_results_user_url,
                    wpt_metric_first_view_tti=formatted_results[
                        "wpt_metric_first_view_tti"
                    ],
                    wpt_metric_repeat_view_tti=formatted_results[
                        "wpt_metric_repeat_view_tti"
                    ],
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
                    wpt_metric_first_view_visually_complete=formatted_results[
                        "wpt_metric_first_view_visually_complete"
                    ],
                    wpt_metric_repeat_view_visually_complete=formatted_results[
                        "wpt_metric_repeat_view_visually_complete"
                    ],
                    wpt_metric_lighthouse_performance=formatted_results[
                        "wpt_metric_lighthouse_performance"
                    ],
                    script_step_name=formatted_results.get("step_name"),
                    script_step_number=formatted_results.get("step_number"),
                    lh_metric_tti_displayed_value=formatted_results.get(
                        "lh_metric_tti_displayed_value"
                    ),
                    lh_metric_tti_score=formatted_results.get("lh_metric_tti_score"),
                    lh_metric_first_contentful_paint_displayed_value=formatted_results.get(
                        "lh_metric_first_contentful_paint_displayed_value"
                    ),
                    lh_metric_first_contentful_paint_score=formatted_results.get(
                        "lh_metric_first_contentful_paint_score"
                    ),
                    lh_metric_speed_index_displayed_value=formatted_results.get(
                        "lh_metric_speed_index_displayed_value"
                    ),
                    lh_metric_speed_index_score=formatted_results.get(
                        "lh_metric_speed_index_score"
                    ),
                    lh_metric_first_meaningful_paint_displayed_value=formatted_results.get(
                        "lh_metric_first_meaningful_paint_displayed_value"
                    ),
                    lh_metric_first_meaningful_paint_score=formatted_results.get(
                        "lh_metric_first_meaningful_paint_score"
                    ),
                    lh_metric_first_cpu_idle_displayed_value=formatted_results.get(
                        "lh_metric_first_cpu_idle_displayed_value"
                    ),
                    lh_metric_first_cpu_idle_score=formatted_results.get(
                        "lh_metric_first_cpu_idle_score"
                    ),
                    lh_metric_max_potential_first_input_delay_displayed_value=formatted_results.get(
                        "lh_metric_max_potential_first_input_delay_displayed_value"
                    ),
                    lh_metric_max_potential_first_input_delay_score=formatted_results.get(
                        "lh_metric_max_potential_first_input_delay_score"
                    ),
                )
                audit_results.save()

            project.screenshot_url = formatted_results["screenshot_url"]
            project.save()

            AuditStatusHistory.objects.create(
                audit=audit,
                status=AvailableStatuses.SUCCESS.value,
                details=(
                    "Audit Successful! AuditResults uuid: %s" % str(audit_results.uuid)
                ),
            )
            AuditStatusHistory.objects.filter(
                audit=audit, status=AvailableStatuses.PENDING.value
            ).delete()
        except Exception:
            logging.error("Could not parse audit result", stack_info=True)
            audit_results = AuditResults(
                audit=audit,
                wpt_results_json_url=json_url,
                wpt_results_user_url=wpt_results_user_url,
            )
            audit_results.save()
            AuditStatusHistory.objects.create(
                audit=audit,
                status=AvailableStatuses.ERROR.value,
                details=(
                    "Error while parsing the audit results from WPT. AuditResults uuid: %s"
                    % str(audit_results.uuid)
                ),
            )


@shared_task
def request_all_audits():
    pages = Page.objects.filter(project__is_active=True).iterator()

    for page in pages:
        audit_parameters_list = page.project.audit_parameters_list.all()
        for audit_parameters in audit_parameters_list:
            audit = Audit(page=page, parameters=audit_parameters)
            audit.save()
            request_audit.delay(audit.uuid)

    scripts = Script.objects.filter(project__is_active=True).iterator()

    for script in scripts:
        audit_parameters_list = script.project.audit_parameters_list.all()
        for audit_parameters in audit_parameters_list:
            audit = Audit(script=script, parameters=audit_parameters)
            audit.save()
            request_audit.delay(audit.uuid)


@shared_task
def clean_old_audit_statuses():
    for audit in Audit.objects.all():
        statuses = AuditStatusHistory.objects.filter(audit=audit)
        if AvailableStatuses.SUCCESS.value in statuses.values_list("status", flat=True):
            statuses.filter(status=AvailableStatuses.PENDING.value).delete()
            statuses.filter(status=AvailableStatuses.QUEUEING.value).delete()
            statuses.filter(status=AvailableStatuses.RUNNING.value).delete()


@shared_task
def clean_unfinished_audits():
    """some audits may never finish and end up stuck in a loop. we need to remove those"""
    finished_statuses = (AvailableStatuses.ERROR.value, AvailableStatuses.SUCCESS.value)
    for audit in Audit.objects.prefetch_related("audit_status_history"):
        if (
            audit.audit_status_history.order_by("created_at").last().status
            not in finished_statuses
        ):
            print(f"Deleting {audit.uuid}: {audit}")
            audit.delete()


@shared_task
def get_wpt_audit_configurations(wpt_instance_url="https://webpagetest.org"):
    """gets all the available locations from WPT"""

    # For some reason, the key mask to get API-available locations is different between
    # public and private WPT instances
    wpt_key_mask = ""
    if wpt_instance_url == "https://webpagetest.org":
        wpt_key_mask = "A"

    response = requests.get(
        f"{wpt_instance_url}/getLocations.php?f=json&k={wpt_key_mask}"
    )

    if response.status_code != 200:
        logging.error("Invalid response from WebPageTest API: non-200 response code")
        raise Exception("Invalid response from WebPageTest API: non-200 response code")

    try:
        data = response.json()["data"]
    except KeyError:
        logging.error(
            "Invalid response from WebPageTest API: 'data' key is not present"
        )
        raise Exception(
            "Invalid response from WebPageTest API: 'data' key is not present"
        )

    for available_audit_parameter in AvailableAuditParameters.objects.filter(
        wpt_instance_url=wpt_instance_url
    ):
        available_audit_parameter.is_active = False
        available_audit_parameter.save()

    for location, location_data in data.items():
        browsers = location_data["Browsers"].split(",")
        group = location_data.get(
            "group", ""
        )  # Private instances locations may not be grouped
        label = location_data["labelShort"]
        for browser in browsers:
            configuration, created = AvailableAuditParameters.objects.update_or_create(
                browser=browser,
                location=location,
                defaults={
                    "location_label": label,
                    "location_group": group,
                    "is_active": True,
                },
                wpt_instance_url=wpt_instance_url,
            )
