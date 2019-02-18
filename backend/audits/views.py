from audits.models import AuditResults, AuditStatusHistory
from audits.serializers import (
    AuditResultsSerializer,
    AuditSerializer,
    AuditStatusHistorySerializer,
)
from audits.tasks import request_audit as task_request_audit
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from projects.models import Page
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser


@csrf_exempt
@api_view(["POST"])
def request_audit(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        page_uuid = data["page"]
        page = get_object_or_404(Page, pk=page_uuid)

        serializer = AuditSerializer(data=data)
        if serializer.is_valid():
            audit = serializer.save(page=page)
            task_request_audit.delay(audit.uuid)
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
