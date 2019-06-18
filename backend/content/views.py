from django.http import JsonResponse
from content.models import WhatsNew
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def lastUpdateNewsletter(request):
    return JsonResponse(
        {"last_update_newsletter": WhatsNew.objects.first().last_update_newsletter}
    )
