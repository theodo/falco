from audits.models import Audit, AuditResults, AuditStatusHistory
from audits.serializers import (
    AuditResultsSerializer,
    AuditSerializer,
    AuditStatusHistorySerializer,
)
from audits.tasks import request_audit as task_request_audit
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from projects.models import Page, Script
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def request_audit(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        page_uuid = data.get("page")
        script_uuid = data.get("script")
        if page_uuid is not None:
            page = get_object_or_404(Page, pk=page_uuid)
            audit_parameters_list = page.project.audit_parameters_list.all()
        elif script_uuid is not None:
            script = get_object_or_404(Script, pk=script_uuid)
            audit_parameters_list = script.project.audit_parameters_list.all()

        created_audits = []
        for audit_parameters in audit_parameters_list:
            serializer = AuditSerializer(data=data)
            if serializer.is_valid():
                if page_uuid is not None:
                    audit = serializer.save(page=page, parameters=audit_parameters)
                elif script_uuid is not None:
                    audit = serializer.save(script=script, parameters=audit_parameters)
                task_request_audit.delay(audit.uuid)
                created_audits.append(audit)
            else:
                return JsonResponse(
                    serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )

        created_audit_serializers = AuditSerializer(created_audits, many=True)

        return JsonResponse(
            created_audit_serializers.data, status=status.HTTP_201_CREATED, safe=False
        )


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def audit_status(request, audit_uuid):
    if request.method == "GET":
        latest_audit_status = AuditStatusHistory.objects.filter(
            audit=audit_uuid
        ).order_by("-created_at")[0]
        serializer = AuditStatusHistorySerializer(latest_audit_status)
        return JsonResponse(serializer.data, safe=False)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def audit_results(request, audit_uuid):
    if request.method == "GET":
        audit_results = AuditResults.objects.get(audit=audit_uuid)
        serializer = AuditResultsSerializer(audit_results)
        return JsonResponse(serializer.data, safe=False)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def audits_results(request):
    """ Returns every audit result for a given page """
    if request.method == "GET":
        page_uuid = request.GET.get("page")
        script_uuid = request.GET.get("script")
        if page_uuid is not None:
            get_object_or_404(Page, pk=page_uuid)
            audits = Audit.objects.filter(page=page_uuid)
            audits_results = AuditResults.objects.filter(audit__in=audits)
            serializer = AuditResultsSerializer(audits_results, many=True)
        elif script_uuid is not None:
            get_object_or_404(Script, pk=script_uuid)
            audits = Audit.objects.filter(script=script_uuid)
            audits_results = AuditResults.objects.filter(audit__in=audits)
            serializer = AuditResultsSerializer(audits_results, many=True)

        return JsonResponse(serializer.data, safe=False)
