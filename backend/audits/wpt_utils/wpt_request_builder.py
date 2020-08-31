from projects.models import NetworkShapeOptions


def get_wpt_runtest_payload(audit):
    """
    See https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis
    for all available parameters in the WebPageTest API
    """
    parameters = audit.parameters

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
    elif audit.script is not None:
        payload["script"] = audit.script.script
        payload["k"] = audit.script.project.wpt_api_key
    else:
        raise Exception("Malformed audit: no page and no script")

    return payload
