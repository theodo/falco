import logging


def format_wpt_json_results_for_page(data):
    lighthouse_data = data.get("lighthouse")
    lighthouse_metrics = dict()
    # lighthouse_data["audits"] only exists on Chrome browser
    if lighthouse_data is not None and lighthouse_data.get("audits"):

        lighthouse_audits = lighthouse_data.get("audits")

        lighthouse_metrics = {
            "lh_metric_tti_displayed_value": lighthouse_audits["interactive"][
                "displayValue"
            ],
            "lh_metric_tti_score": lighthouse_audits["interactive"]["score"],
            "lh_metric_first_contentful_paint_displayed_value": lighthouse_audits[
                "first-contentful-paint"
            ]["displayValue"],
            "lh_metric_first_contentful_paint_score": lighthouse_audits[
                "first-contentful-paint"
            ]["score"],
            "lh_metric_speed_index_displayed_value": lighthouse_audits["speed-index"][
                "displayValue"
            ],
            "lh_metric_speed_index_score": lighthouse_audits["speed-index"]["score"],
            "lh_metric_first_meaningful_paint_displayed_value": lighthouse_audits[
                "first-meaningful-paint"
            ]["displayValue"],
            "lh_metric_first_meaningful_paint_score": lighthouse_audits[
                "first-meaningful-paint"
            ]["score"],
            "lh_metric_first_cpu_idle_displayed_value": lighthouse_audits[
                "first-cpu-idle"
            ]["displayValue"],
            "lh_metric_first_cpu_idle_score": lighthouse_audits["first-cpu-idle"][
                "score"
            ],
            "lh_metric_max_potential_first_input_delay_displayed_value": lighthouse_audits[
                "max-potential-fid"
            ][
                "displayValue"
            ],
            "lh_metric_max_potential_first_input_delay_score": lighthouse_audits[
                "max-potential-fid"
            ]["score"],
        }

    wpt_metrics = {
        "wpt_metric_first_view_tti": data["median"]["firstView"].get(
            "TimeToInteractive"
        )
        or data["median"]["firstView"].get("FirstInteractive")
        or data["median"]["firstView"].get("LastInteractive"),
        "wpt_metric_repeat_view_tti": data["median"]["repeatView"].get(
            "TimeToInteractive"
        )
        or data["median"]["repeatView"].get("FirstInteractive")
        or data["median"]["repeatView"].get("LastInteractive"),
        "wpt_metric_first_view_speed_index": data["median"]["firstView"].get(
            "SpeedIndex"
        ),
        "wpt_metric_repeat_view_speed_index": data["median"]["repeatView"].get(
            "SpeedIndex"
        ),
        "wpt_metric_first_view_first_paint": data["median"]["firstView"].get(
            "firstPaint"
        ),
        "wpt_metric_repeat_view_first_paint": data["median"]["repeatView"].get(
            "firstPaint"
        ),
        "wpt_metric_first_view_first_meaningful_paint": data["median"]["firstView"].get(
            "firstMeaningfulPaint"
        ),
        "wpt_metric_repeat_view_first_meaningful_paint": data["median"][
            "repeatView"
        ].get("firstMeaningfulPaint"),
        "wpt_metric_first_view_first_contentful_paint": data["median"]["firstView"].get(
            "firstContentfulPaint"
        ),
        "wpt_metric_repeat_view_first_contentful_paint": data["median"][
            "repeatView"
        ].get("firstContentfulPaint"),
        "wpt_metric_first_view_load_time": data["median"]["firstView"].get("loadTime"),
        "wpt_metric_repeat_view_load_time": data["median"]["repeatView"].get(
            "loadTime"
        ),
        "wpt_metric_first_view_time_to_first_byte": data["median"]["firstView"].get(
            "TTFB"
        ),
        "wpt_metric_repeat_view_time_to_first_byte": data["median"]["repeatView"][
            "TTFB"
        ],
        "wpt_metric_first_view_visually_complete": data["median"]["firstView"].get(
            "visualComplete"
        ),
        "wpt_metric_repeat_view_visually_complete": data["median"]["repeatView"].get(
            "visualComplete"
        ),
        "wpt_metric_lighthouse_performance": data["median"]["firstView"].get(
            "lighthouse.Performance"
        ),
        "screenshot_url": data["median"]["firstView"]["images"]["screenShot"],
    }
    wpt_metrics.update(lighthouse_metrics)

    return [wpt_metrics]


def format_wpt_json_results_for_script(data):
    # For scripts there wont be any lighthouse metrics
    result_array = []

    number_of_steps = data["runs"]["1"]["firstView"]["numSteps"]
    first_view_median_run_index = str(
        int(data["median"]["firstView"]["run"] / number_of_steps)
    )
    repeat_view_median_run_index = str(
        int(data["median"]["repeatView"]["run"] / number_of_steps)
    )

    number_of_tests = data["testRuns"]
    if not 1 <= int(first_view_median_run_index) <= number_of_tests:
        first_view_median_run_index = "1"
        logging.warn("[WPT Warning] First view median run index not admissible")
    if not 1 <= int(repeat_view_median_run_index) <= number_of_tests:
        repeat_view_median_run_index = "1"
        logging.warn("[WPT Warning] Repeat view median run index not admissible")

    for step_index in range(0, number_of_steps):
        if number_of_steps == 1:
            first_view_step_data = data["runs"][first_view_median_run_index][
                "firstView"
            ]
            repeat_view_step_data = data["runs"][repeat_view_median_run_index][
                "repeatView"
            ]
        else:
            first_view_step_data = data["runs"][first_view_median_run_index][
                "firstView"
            ]["steps"][step_index]
            repeat_view_step_data = data["runs"][repeat_view_median_run_index][
                "repeatView"
            ]["steps"][step_index]

        result_array.append(
            {
                "wpt_metric_first_view_tti": first_view_step_data.get(
                    "FirstInteractive"
                )
                or first_view_step_data.get("LastInteractive"),
                "wpt_metric_repeat_view_tti": repeat_view_step_data.get(
                    "FirstInteractive"
                )
                or repeat_view_step_data.get("LastInteractive"),
                "wpt_metric_first_view_speed_index": first_view_step_data["SpeedIndex"],
                "wpt_metric_repeat_view_speed_index": repeat_view_step_data[
                    "SpeedIndex"
                ],
                "wpt_metric_first_view_first_paint": first_view_step_data["firstPaint"],
                "wpt_metric_repeat_view_first_paint": repeat_view_step_data[
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
                "wpt_metric_first_view_load_time": first_view_step_data["loadTime"],
                "wpt_metric_repeat_view_load_time": repeat_view_step_data["loadTime"],
                "wpt_metric_first_view_time_to_first_byte": first_view_step_data[
                    "TTFB"
                ],
                "wpt_metric_repeat_view_time_to_first_byte": repeat_view_step_data[
                    "TTFB"
                ],
                "wpt_metric_first_view_visually_complete": first_view_step_data[
                    "visualComplete"
                ],
                "wpt_metric_repeat_view_visually_complete": repeat_view_step_data[
                    "visualComplete"
                ],
                "wpt_metric_lighthouse_performance": first_view_step_data.get(
                    "lighthouse.Performance"
                ),
                "screenshot_url": first_view_step_data["images"]["screenShot"],
                "script_step_name": first_view_step_data["eventName"],
                "script_step_number": first_view_step_data["step"],
            }
        )

    return result_array
