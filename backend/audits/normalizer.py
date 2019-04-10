def format_wpt_json_results_for_page(data):
    return [{
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
    }]


def format_wpt_json_results_for_script(data):
    result_array = []

    number_of_steps = data["runs"]["1"]["firstView"]["numSteps"]
    first_view_median_run_index = str(int(data["median"]["firstView"]["run"] / number_of_steps))
    repeat_view_median_run_index = str(int(data["median"]["repeatView"]["run"] / number_of_steps))

    for step_index in range(0, number_of_steps):
        first_view_step_data = data["runs"][first_view_median_run_index]["firstView"]["steps"][step_index]
        repeat_view_step_data = data["runs"][repeat_view_median_run_index]["repeatView"]["steps"][step_index]
        result_array.append(
            {
                "wpt_metric_first_view_tti": first_view_step_data.get(
                    "FirstInteractive"
                ) or first_view_step_data.get("LastInteractive"),
                "wpt_metric_repeat_view_tti": repeat_view_step_data.get(
                    "FirstInteractive"
                ) or repeat_view_step_data.get("LastInteractive"),
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
            }
        )

    return result_array
