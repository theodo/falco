from core.models import User
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from projects.models import Page, Project, ProjectMemberRole
from projects.serializers import (
    PageSerializer,
    ProjectSerializer,
    ProjectMemberRoleSerializer,
)
from projects.permissions import check_if_member_of_project, check_if_admin_of_project
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser


def get_user_projects(user_id):
    return Project.objects.filter(members__id=user_id, is_active=True)


@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def project_list(request):
    if request.method == "GET":
        projects = get_user_projects(request.user.id)
        serializer = ProjectSerializer(projects, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == "POST":
        data = JSONParser().parse(request)
        serializer = ProjectSerializer(data=data)
        if serializer.is_valid():
            project = Project.objects.create(**serializer.validated_data)
            project.save()
            return JsonResponse(
                {"uuid": project.uuid, **serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def first_project(request):
    """returns the first project of the user, a boolean that indicates whether
    the user has other projects.
    This will speed up the loading of the first project page"""
    projects = get_user_projects(request.user.id)
    serializer = ProjectSerializer(projects.first())
    return JsonResponse(
        {"project": serializer.data, "has_siblings": projects.count() > 1}
    )


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([permissions.IsAuthenticated])
def project_detail(request, project_uuid):
    project = get_object_or_404(Project, pk=project_uuid)
    check_if_member_of_project(request.user.id, project.uuid)

    if request.method == "GET":
        projects = get_user_projects(request.user.id)
        serializer = ProjectSerializer(project)
        return JsonResponse(
            {"project": serializer.data, "has_siblings": projects.count() > 1}
        )

    elif request.method == "PUT":
        check_if_admin_of_project(request.user.id, project.uuid)
        data = JSONParser().parse(request)
        serializer = ProjectSerializer(project, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        check_if_admin_of_project(request.user.id, project.uuid)
        project.delete()
        return JsonResponse({}, status=status.HTTP_204_NO_CONTENT)


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
        check_if_admin_of_project(request.user.id, project.id)
        data = JSONParser().parse(request)
        serializer = PageSerializer(data=data)
        if serializer.is_valid():
            page = Page.objects.create(project=project, **serializer.validated_data)
            page.save()
            return JsonResponse(
                {"uuid": page.uuid, **serializer.data}, status=status.HTTP_201_CREATED
            )
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        check_if_admin_of_project(request.user.id, project.id)
        data = JSONParser().parse(request)
        serializer = PageSerializer(page, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        check_if_admin_of_project(request.user.id, project.id)
        page.delete()
        return JsonResponse({}, status=status.HTTP_204_NO_CONTENT)


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
