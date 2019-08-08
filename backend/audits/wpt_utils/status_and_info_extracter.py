import re
import json
from audits.models import AvailableStatuses


def extract_status_and_info(api_response):
    """
        Transforms the status returned by WebPageTest into a better data structure so that it can be displayed and translated in the front.
        WPT returns four possible statuses :
        - A json containing information about the test
        - "Waiting behind N other tests.../ Waiting at the front of the queue... (case N = 0)"
        - "Test Started x seconds/minutes ago"
        - "Completed x of y tests"
    """
    info = {
        "positionInQueue": None,
        "runningTime": None,
        "completedTests": None,
        "totalTests": None,
    }
    status = AvailableStatuses.QUEUEING.value
    if "Waiting" in api_response:
        if api_response == "Waiting at the front of the queue...":
            info["positionInQueue"] = 0
            return (status, json.dumps(info))
        queueing_test = re.search("Waiting behind (.+?) other test", api_response)
        if queueing_test:
            info["positionInQueue"] = queueing_test.group(1)
        return (status, json.dumps(info))
    started_test = re.search("Test Started (.+?) (.+?) ago", api_response)
    if started_test:
        status = AvailableStatuses.RUNNING.value
        running_time = int(started_test.group(1))
        if "hour" in started_test.group(2):
            info["runningTime"] = running_time * 3600
        elif "minute" in started_test.group(2):
            info["runningTime"] = running_time * 60
        else:
            info["runningTime"] = running_time
        return (status, json.dumps(info))
    running_test = re.search("Completed (.+?) of (.+?) tests", api_response)
    if running_test:
        status = AvailableStatuses.RUNNING.value
        info["completedTests"] = running_test.group(1)
        info["totalTests"] = running_test.group(2)
    return (status, json.dumps(info))
