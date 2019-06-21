from django.http import JsonResponse
from content.models import WhatsNew
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def get_last_update_newsletter(request):
    whats_new = WhatsNew.objects.first()
    last_update_date = whats_new.last_update_newsletter if whats_new else None

    return JsonResponse({"last_update_newsletter": last_update_date})
