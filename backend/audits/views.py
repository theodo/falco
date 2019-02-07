from audits.models import AuditResults, AuditStatusHistory
from audits.serializers import AuditResultsSerializer, AuditStatusHistorySerializer
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view


@ensure_csrf_cookie
@api_view(["GET"])
def audit_status(request, audit_uuid):
    if request.method == "GET":
        latest_audit_status = AuditStatusHistory.objects.filter(
            audit=audit_uuid
        ).order_by("-created_at")[0]
        serializer = AuditStatusHistorySerializer(latest_audit_status)
        return JsonResponse(serializer.data, safe=False)


@ensure_csrf_cookie
@api_view(["GET"])
def audit_results(request, audit_uuid):
    if request.method == "GET":
        audit_results = AuditResults.objects.get(audit=audit_uuid)
        serializer = AuditResultsSerializer(audit_results)
        return JsonResponse(serializer.data, safe=False)
