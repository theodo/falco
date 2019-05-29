from root.settings.prod import GOOGLE_ANALYTICS_ID


def google_analytics_id(request):
    if GOOGLE_ANALYTICS_ID:
        return {"google_analytics_id": GOOGLE_ANALYTICS_ID}
