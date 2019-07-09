from django.http import JsonResponse
from django.db.models import Q
from django.shortcuts import get_object_or_404
from projects.models import Page, Project
from projects.serializers import PageSerializer, ProjectSerializer
from projects.permissions import check_if_member_of_project, check_if_admin_of_project
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser


def get_user_projects(user_id):
    return Project.objects.filter(
        Q(Q(members__id=user_id) | Q(admins__id=user_id)), is_active=True
    )


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
    """returns the first project of the user, and if he has others
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
        serializer = ProjectSerializer(project)
        return JsonResponse(serializer.data)

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
