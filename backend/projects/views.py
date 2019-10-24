from core.models import User
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from projects.models import (
    Page,
    Project,
    ProjectMemberRole,
    ProjectAuditParameters,
    AvailableAuditParameters,
    Script,
)
from projects.serializers import (
    PageSerializer,
    ProjectSerializer,
    ProjectMemberRoleSerializer,
    ProjectAuditParametersSerializer,
    AvailableAuditParameterSerializer,
    ScriptSerializer,
)
from projects.permissions import (
    check_if_member_of_project,
    check_if_admin_of_project,
    is_admin_of_project,
)


def get_user_projects(user_id):
    return Project.objects.filter(members__id=user_id, is_active=True)


@swagger_auto_schema(
    methods=["get"],
    responses={
        200: openapi.Response(
            "Returns a list of all the user’s projects", ProjectSerializer(many=True)
        )
    },
    tags=["Projects"],
)
@swagger_auto_schema(
    methods=["post"],
    request_body=ProjectSerializer,
    responses={201: openapi.Response("Returns the created project", ProjectSerializer)},
    tags=["Projects"],
)
@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def project_list(request):
    if request.method == "GET":
        projects = get_user_projects(request.user.id)
        serializer = ProjectSerializer(
            projects, many=True, context={"user_id": request.user.id}
        )
        return JsonResponse(serializer.data, safe=False)
    elif request.method == "POST":
        data = JSONParser().parse(request)
        serializer = ProjectSerializer(data=data, context={"user_id": request.user.id})
        if serializer.is_valid():

            pages = serializer.validated_data.pop("pages")
            scripts = serializer.validated_data.pop("scripts")
            audit_parameters_list = serializer.validated_data.pop(
                "audit_parameters_list"
            )
            members = serializer.validated_data.pop("members")

            project = Project.objects.create(**serializer.validated_data)

            project.pages.set(
                [
                    Page.objects.create(
                        url=page.get("url"), name=page.get("name"), project=project
                    )
                    for page in pages
                ]
            )
            project.scripts.set(
                [
                    Script.objects.create(
                        name=script.get("name"),
                        script=script.get("script"),
                        project=project,
                    )
                    for script in scripts
                ]
            )
            project.audit_parameters_list.set(
                [
                    ProjectAuditParameters.objects.create(
                        name=audit_parameter.get("name"),
                        configuration=audit_parameter.get("configuration"),
                        network_shape=audit_parameter.get("network_shape"),
                        project=project,
                    )
                    for audit_parameter in audit_parameters_list
                ]
            )
            # Probleme here to pass user
            project.members.set(
                [
                    ProjectMemberRole.objects.create(
                        project=project, is_admin=member.get("is_admin")
                    )
                    for member in members
                ]
            )

            project.save()
            return JsonResponse(
                {"uuid": project.uuid, **serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    methods=["get"],
    responses={200: openapi.Response("", ProjectSerializer)},
    tags=["Projects"],
)
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def first_project(request):
    """Returns the first project of the user.
    This is used to speed up the loading of the first project page"""
    projects = get_user_projects(request.user.id)
    serializer = ProjectSerializer(
        projects.first(), context={"user_id": request.user.id}
    )
    return JsonResponse(serializer.data)


@swagger_auto_schema(
    methods=["get"],
    responses={
        200: openapi.Response("Returns details of a project.", ProjectSerializer)
    },
    tags=["Projects"],
)
@swagger_auto_schema(
    methods=["put"],
    request_body=ProjectSerializer,
    responses={
        200: openapi.Response(
            "Updates a project. Allows for partial updates.", ProjectSerializer
        )
    },
    tags=["Projects"],
)
@swagger_auto_schema(
    methods=["delete"], responses={204: "No content"}, tags=["Projects"]
)
@api_view(["GET", "PUT", "DELETE"])
@permission_classes([permissions.IsAuthenticated])
def project_detail(request, project_uuid):
    project = get_object_or_404(Project, pk=project_uuid)
    check_if_member_of_project(request.user.id, project.uuid)

    if request.method == "GET":
        if is_admin_of_project(request.user.id, project.uuid):
            serializer = ProjectSerializer(
                project, context={"user_id": request.user.id}
            )
            return JsonResponse(serializer.data)
        serializer = ProjectSerializer(
            project,
            fields=(
                "uuid",
                "name",
                "project_members",
                "pages",
                "scripts",
                "audit_parameters_list",
                "screenshot_url",
                "latest_audit_at",
            ),
            context={"user_id": request.user.id},
        )
        return JsonResponse(serializer.data)

    elif request.method == "PUT":
        check_if_admin_of_project(request.user.id, project.uuid)
        data = JSONParser().parse(request)
        serializer = ProjectSerializer(
            project, data=data, partial=True, context={"user_id": request.user.id}
        )
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        check_if_admin_of_project(request.user.id, project.uuid)
        project.delete()
        return JsonResponse({}, status=status.HTTP_204_NO_CONTENT)


@swagger_auto_schema(
    methods=["get"],
    responses={
        200: openapi.Response(
            "Returns a list of all pages in the project", PageSerializer(many=True)
        )
    },
    tags=["Pages"],
)
@swagger_auto_schema(
    methods=["post"],
    request_body=PageSerializer,
    responses={201: openapi.Response("Returns the created page", PageSerializer)},
    tags=["Pages"],
)
@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def project_page_list(request, project_uuid):
    project = Project.objects.get(uuid=project_uuid)
    check_if_member_of_project(request.user.id, project.uuid)

    if request.method == "GET":
        pages = project.pages.all()
        serializer = PageSerializer(pages, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == "POST":
        check_if_admin_of_project(request.user.id, project.uuid)
        data = JSONParser().parse(request)
        serializer = PageSerializer(data=data)
        if serializer.is_valid():
            page = Page.objects.create(project=project, **serializer.validated_data)
            page.save()
            return JsonResponse(
                {"uuid": page.uuid, **serializer.data}, status=status.HTTP_201_CREATED
            )
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    methods=["get"],
    responses={200: openapi.Response("Returns details of a page.", PageSerializer)},
    tags=["Pages"],
)
@swagger_auto_schema(
    methods=["put"],
    request_body=PageSerializer,
    responses={
        200: openapi.Response(
            "Updates a page. Allows for partial updates.", PageSerializer
        )
    },
    tags=["Pages"],
)
@swagger_auto_schema(methods=["delete"], responses={204: "No content"}, tags=["Pages"])
@api_view(["GET", "PUT", "DELETE"])
@permission_classes([permissions.IsAuthenticated])
def project_page_detail(request, project_uuid, page_uuid):
    project = get_object_or_404(Project, pk=project_uuid)
    page = get_object_or_404(Page, pk=page_uuid)
    check_if_member_of_project(request.user.id, project.uuid)

    if page.project != project:
        return JsonResponse({}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "GET":
        serializer = PageSerializer(page)
        return JsonResponse(serializer.data)

    elif request.method == "PUT":
        check_if_admin_of_project(request.user.id, project.uuid)
        data = JSONParser().parse(request)
        serializer = PageSerializer(page, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        check_if_admin_of_project(request.user.id, project.uuid)
        page.delete()
        return JsonResponse({}, status=status.HTTP_204_NO_CONTENT)


@swagger_auto_schema(
    methods=["post"],
    request_body=ProjectAuditParametersSerializer,
    responses={
        201: openapi.Response(
            "Returns the created project audit parameter",
            ProjectAuditParametersSerializer,
        )
    },
    tags=["Project Audit Parameters"],
)
@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def project_audit_parameter_list(request, project_uuid):
    project = Project.objects.get(uuid=project_uuid)
    check_if_admin_of_project(request.user.id, project.uuid)
    data = JSONParser().parse(request)
    serializer = ProjectAuditParametersSerializer(data=data)
    if serializer.is_valid():
        audit_parameter = ProjectAuditParameters.objects.create(
            project=project, **serializer.validated_data
        )
        audit_parameter.save()
        serializer = ProjectAuditParametersSerializer(audit_parameter)
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    methods=["get"],
    responses={
        200: openapi.Response(
            "Returns the details of a project audit parameter.",
            ProjectAuditParametersSerializer,
        )
    },
    tags=["Project Audit Parameters"],
)
@swagger_auto_schema(
    methods=["put"],
    request_body=ProjectAuditParametersSerializer,
    responses={
        200: openapi.Response(
            "Updates a project audit parameter. Allows for partial updates.",
            ProjectAuditParametersSerializer,
        )
    },
    tags=["Project Audit Parameters"],
)
@swagger_auto_schema(
    methods=["delete"], responses={204: "No content"}, tags=["Project Audit Parameters"]
)
@api_view(["GET", "PUT", "DELETE"])
@permission_classes([permissions.IsAuthenticated])
def project_audit_parameters_detail(request, project_uuid, audit_parameters_uuid):
    project = get_object_or_404(Project, pk=project_uuid)
    audit_parameters = get_object_or_404(
        ProjectAuditParameters, pk=audit_parameters_uuid
    )
    check_if_member_of_project(request.user.id, project.uuid)

    if audit_parameters.project != project:
        return JsonResponse({}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "GET":
        serializer = ProjectAuditParametersSerializer(audit_parameters)
        return JsonResponse(serializer.data)

    elif request.method == "PUT":
        check_if_admin_of_project(request.user.id, project.uuid)
        data = JSONParser().parse(request)
        serializer = ProjectAuditParametersSerializer(audit_parameters, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        check_if_admin_of_project(request.user.id, project.uuid)
        audit_parameters.delete()
        return JsonResponse({}, status=status.HTTP_204_NO_CONTENT)


@swagger_auto_schema(
    methods=["put"],
    request_body=ProjectMemberRoleSerializer,
    responses={
        200: openapi.Response(
            "Updates a project member. Allows for partial updates.",
            ProjectMemberRoleSerializer,
        )
    },
    tags=["Project Members"],
)
@swagger_auto_schema(
    methods=["delete"], responses={204: "No content"}, tags=["Project Members"]
)
@api_view(["PUT", "DELETE"])
@permission_classes([permissions.IsAuthenticated])
def project_member_detail(request, project_uuid, user_id):
    project = get_object_or_404(Project, pk=project_uuid)
    check_if_admin_of_project(request.user.id, project.uuid)

    project_member = ProjectMemberRole.objects.filter(
        project_id=project_uuid, user_id=user_id
    )

    if not project_member:
        return HttpResponse(
            "No project member was found", status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "PUT":
        data = JSONParser().parse(request)
        if "is_admin" in data and type(data["is_admin"]) is bool:
            project_member.update(is_admin=data["is_admin"])
            serializer = ProjectMemberRoleSerializer(project_member.first())
            return JsonResponse(serializer.data)
        return HttpResponse(
            "Please provide a valid 'is_admin' value.",
            status=status.HTTP_400_BAD_REQUEST,
        )

    elif request.method == "DELETE":
        project_member.delete()
        return JsonResponse({}, status=status.HTTP_204_NO_CONTENT)


@swagger_auto_schema(
    methods=["post"],
    request_body=openapi.Schema(
        type="object", properties={"user_id": openapi.Schema(type="string")}
    ),
    responses={
        201: openapi.Response(
            "Returns the updated project with the new member.", ProjectSerializer
        )
    },
    tags=["Project Members"],
)
@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def project_members(request, project_uuid):
    project = get_object_or_404(Project, pk=project_uuid)
    check_if_admin_of_project(request.user.id, project.uuid)

    data = JSONParser().parse(request)
    if "user_id" in data:
        if not ProjectMemberRole.objects.filter(
            project_id=project_uuid, user_id=data["user_id"]
        ):
            user = User.objects.filter(id=data["user_id"])
            if not user:
                return HttpResponse(
                    "No user found with this id", status=status.HTTP_404_NOT_FOUND
                )
            project = Project.objects.filter(uuid=project_uuid).first()
            project.members.add(user.first(), through_defaults={"is_admin": False})
            serializer = ProjectSerializer(project)
            return JsonResponse(serializer.data)
        return HttpResponse(
            "The user is already a member of the project",
            status=status.HTTP_400_BAD_REQUEST,
        )
    return HttpResponse(
        "You must provide a user_id", status=status.HTTP_400_BAD_REQUEST
    )


@swagger_auto_schema(
    methods=["get"],
    responses={
        200: openapi.Response(
            "Returns all WebPageTest available audit parameters",
            AvailableAuditParameterSerializer,
        )
    },
    tags=["Project Audit Parameters"],
)
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def available_audit_parameters(request):
    available_audit_parameters = AvailableAuditParameters.objects.filter(is_active=True)
    serializer = AvailableAuditParameterSerializer(
        available_audit_parameters, many=True
    )
    return JsonResponse(serializer.data, safe=False)


@swagger_auto_schema(
    methods=["post"],
    request_body=ScriptSerializer,
    responses={201: openapi.Response("Returns the created script", ScriptSerializer)},
    tags=["Scripts"],
)
@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def project_scripts(request, project_uuid):
    project = Project.objects.get(uuid=project_uuid)
    check_if_admin_of_project(request.user.id, project.uuid)
    data = JSONParser().parse(request)
    serializer = ScriptSerializer(data=data)
    if serializer.is_valid():
        script = Script.objects.create(project=project, **serializer.validated_data)
        script.save()
        return JsonResponse(
            {"uuid": script.uuid, **serializer.data}, status=status.HTTP_201_CREATED
        )
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    methods=["put"],
    request_body=ScriptSerializer,
    responses={
        200: openapi.Response(
            "Updates a script. Allows for partial updates.", ScriptSerializer
        )
    },
    tags=["Scripts"],
)
@swagger_auto_schema(
    methods=["delete"], responses={204: "No content"}, tags=["Scripts"]
)
@api_view(["PUT", "DELETE"])
@permission_classes([permissions.IsAuthenticated])
def project_script_detail(request, project_uuid, script_uuid):
    project = get_object_or_404(Project, pk=project_uuid)
    script = get_object_or_404(Script, pk=script_uuid)
    check_if_member_of_project(request.user.id, project.uuid)

    if script.project != project:
        return JsonResponse({}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "PUT":
        check_if_admin_of_project(request.user.id, project.uuid)
        data = JSONParser().parse(request)
        serializer = ScriptSerializer(script, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        check_if_admin_of_project(request.user.id, project.uuid)
        script.delete()
        return JsonResponse({}, status=status.HTTP_204_NO_CONTENT)
