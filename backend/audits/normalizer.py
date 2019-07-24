import logging


def format_wpt_json_results_for_page(data):
    lighthouse_data = data.get("lighthouse")
    lighthouse_metrics = dict()
    # lighthouse_data["audits"] only exists on Chrome browser
    if lighthouse_data.get("audits"):
        lighthouse_metrics = {
            "lh_metric_tti_displayed_value": lighthouse_data["audits"]["interactive"][
                "displayValue"
            ],
            "lh_metric_tti_score": lighthouse_data["audits"]["interactive"]["score"],
            "lh_metric_first_contentful_paint_displayed_value": lighthouse_data[
                "audits"
            ]["first-contentful-paint"]["displayValue"],
            "lh_metric_first_contentful_paint_score": lighthouse_data["audits"][
                "first-contentful-paint"
            ]["score"],
            "lh_metric_speed_index_displayed_value": lighthouse_data["audits"][
                "speed-index"
            ]["displayValue"],
            "lh_metric_speed_index_score": lighthouse_data["audits"]["speed-index"][
                "score"
            ],
            "lh_metric_first_meaningful_paint_displayed_value": lighthouse_data[
                "audits"
            ]["first-meaningful-paint"]["displayValue"],
            "lh_metric_first_meaningful_paint_score": lighthouse_data["audits"][
                "first-meaningful-paint"
            ]["score"],
            "lh_metric_first_cpu_idle_displayed_value": lighthouse_data["audits"][
                "first-cpu-idle"
            ]["displayValue"],
            "lh_metric_first_cpu_idle_score": lighthouse_data["audits"][
                "first-cpu-idle"
            ]["score"],
            "lh_metric_max_potential_first_input_delay_displayed_value": lighthouse_data[
                "audits"
            ][
                "max-potential-fid"
            ][
                "displayValue"
            ],
            "lh_metric_max_potential_first_input_delay_score": lighthouse_data[
                "audits"
            ]["max-potential-fid"]["score"],
        }
    wpt_metrics = {
        "wpt_metric_first_view_tti": data["median"]["firstView"].get("FirstInteractive")
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
        "wpt_metric_first_view_load_time": data["median"]["firstView"]["loadTime"],
        "wpt_metric_repeat_view_load_time": data["median"]["repeatView"]["loadTime"],
        "wpt_metric_first_view_time_to_first_byte": data["median"]["firstView"]["TTFB"],
        "wpt_metric_repeat_view_time_to_first_byte": data["median"]["repeatView"][
            "TTFB"
        ],
        "wpt_metric_first_view_visually_complete": data["median"]["firstView"][
            "visualComplete"
        ],
        "wpt_metric_repeat_view_visually_complete": data["median"]["repeatView"][
            "visualComplete"
        ],
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
                "wpt_metric_lighthouse_performance": first_view_step_data.get(
                    "lighthouse.Performance"
                ),
                "screenshot_url": first_view_step_data["images"]["screenShot"],
                "step_name": first_view_step_data["eventName"],
                "step_number": first_view_step_data["step"],
            }
        )

    return result_array
