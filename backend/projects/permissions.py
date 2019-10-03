from rest_framework.exceptions import PermissionDenied
from projects.models import Project, ProjectMemberRole


def check_if_member_of_project(member_id, project_uuid):
    project = Project.objects.get(uuid=project_uuid)
    project_member_role = ProjectMemberRole.objects.filter(
        project_id=project_uuid, user_id=member_id
    )

    if not project_member_role:
        raise PermissionDenied(
            detail="You are not authorized to access to this project"
        )

    if not project.is_active:
        raise PermissionDenied(detail="This project has been archived")


def check_if_admin_of_project(member_id, project_uuid):
    if not is_admin_of_project(member_id, project_uuid):
        raise PermissionDenied(detail="You do not have admin access to this project")


def is_admin_of_project(member_id, project_uuid):
    project = Project.objects.get(uuid=project_uuid)
    project_member_role = ProjectMemberRole.objects.filter(
        project_id=project_uuid, user_id=member_id
    )
    if not project.is_active:
        raise PermissionDenied(detail="This project has been archived")

    if not project_member_role or not project_member_role.first().is_admin:
        return False

    if not project.is_active:
        return False

    return True
