import datetime
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes

from audits.models import Audit, AuditResults, AuditStatusHistory, AvailableStatuses
from audits.serializers import (
    AuditResultsSerializer,
    AuditSerializer,
    AuditStatusHistorySerializer,
)
from audits.tasks import request_audit as task_request_audit
from projects.permissions import check_if_member_of_project
from projects.models import Page, Project, Script


@swagger_auto_schema(
    methods=["post"],
    responses={201: openapi.Response("Returns the created audits", AuditSerializer)},
    tags=["Audit"],
)
@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def request_audit(request, project_uuid):
    if request.method == "POST":
        check_if_member_of_project(request.user.id, project_uuid)
        project = get_object_or_404(Project, pk=project_uuid)
        audit_parameters_list = project.audit_parameters_list.all()

        created_audits = []
        for audit_parameters in audit_parameters_list:
            for page in project.pages.all():
                audit = Audit.objects.create(page=page, parameters=audit_parameters)
                task_request_audit.delay(audit.uuid)
                AuditStatusHistory.objects.create(
                    audit=audit,
                    status=AvailableStatuses.REQUESTED.value,
                    details="Audit created in database",
                )
                created_audits.append(audit)

            for script in project.scripts.all():
                audit = Audit.objects.create(script=script, parameters=audit_parameters)
                task_request_audit.delay(audit.uuid)
                AuditStatusHistory.objects.create(
                    audit=audit,
                    status=AvailableStatuses.REQUESTED.value,
                    details="Audit created in database",
                )
                created_audits.append(audit)

        created_audit_serializers = AuditSerializer(created_audits, many=True)

        return JsonResponse(
            created_audit_serializers.data, status=status.HTTP_201_CREATED, safe=False
        )


@swagger_auto_schema(
    methods=["get"],
    responses={
        200: openapi.Response(
            "Returns the status of a given audit", AuditStatusHistorySerializer
        )
    },
    tags=["Audit"],
)
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def audit_status(request, audit_uuid):
    if request.method == "GET":
        latest_audit_status = (
            AuditStatusHistory.objects.filter(audit=audit_uuid)
            .order_by("-created_at")
            .first()
        )

        if latest_audit_status and latest_audit_status.audit.page is not None:
            check_if_member_of_project(
                request.user.id, latest_audit_status.audit.page.project.uuid
            )

        if latest_audit_status and latest_audit_status.audit.script is not None:
            check_if_member_of_project(
                request.user.id, latest_audit_status.audit.script.project.uuid
            )

        serializer = AuditStatusHistorySerializer(latest_audit_status)
        return JsonResponse(serializer.data, safe=False)


@swagger_auto_schema(
    methods=["get"],
    responses={
        200: openapi.Response(
            "Returns the results of a given audit", AuditResultsSerializer
        )
    },
    tags=["Audit"],
)
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def audit_results(request, audit_uuid):
    if request.method == "GET":
        audit_results = AuditResults.objects.get(audit=audit_uuid)

        if audit_results.audit.page is not None:
            check_if_member_of_project(
                request.user.id, audit_results.audit.page.project.uuid
            )

        if audit_results.audit.script is not None:
            check_if_member_of_project(
                request.user.id, audit_results.audit.script.project.uuid
            )

        serializer = AuditResultsSerializer(audit_results)
        return JsonResponse(serializer.data, safe=False)


@swagger_auto_schema(
    methods=["get"],
    responses={
        200: openapi.Response(
            "Returns the full information of all audit results for a given page",
            AuditResultsSerializer(many=True),
        )
    },
    tags=["Audit"],
)
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def audits_results(request):
    """ Returns every audit result for a given page """
    if request.method == "GET":
        page_uuid = request.GET.get("page")
        script_uuid = request.GET.get("script")
        audit_parameters_uuid = request.GET.get("audit_parameters")
        from_date_param = request.GET.get("from_date")
        to_date_param = request.GET.get("to_date")
        epoch = datetime.date(1970, 1, 1)
        from_date = (
            from_date_param and datetime.datetime.strptime(from_date_param, "%Y-%m-%d")
        ) or epoch
        to_date = (
            to_date_param and datetime.datetime.strptime(to_date_param, "%Y-%m-%d")
        ) or datetime.datetime.now()
        if page_uuid is not None:
            page = get_object_or_404(Page, pk=page_uuid)
            check_if_member_of_project(request.user.id, page.project.uuid)
            audits = Audit.objects.filter(page=page_uuid)
            if audit_parameters_uuid:
                audits = audits.filter(parameters=audit_parameters_uuid)
            audits_results = AuditResults.objects.filter(audit__in=audits).filter(
                created_at__gte=from_date,
                created_at__lte=(to_date + datetime.timedelta(days=1)),
            )
            serializer = AuditResultsSerializer(audits_results, many=True)
        elif script_uuid is not None:
            script = get_object_or_404(Script, pk=script_uuid)
            check_if_member_of_project(request.user.id, script.project.uuid)
            audits = Audit.objects.filter(script=script_uuid)
            if audit_parameters_uuid:
                audits = audits.filter(parameters=audit_parameters_uuid)
            audits_results = AuditResults.objects.filter(audit__in=audits)
            serializer = AuditResultsSerializer(audits_results, many=True)

        return JsonResponse(serializer.data, safe=False)
