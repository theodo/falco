from rest_framework.exceptions import PermissionDenied
from core.models import User
from projects.models import Project


def check_if_member_of_project(member_id, project_uuid):
    project = Project.objects.get(uuid=project_uuid)
    user = User.objects.get(id=member_id)

    if (
        (not project)
        or (not user)
        or (user not in project.members.all() and user not in project.admins.all())
    ):
        raise PermissionDenied(
            detail="You are not authorized to access to this project"
        )


def check_if_admin_of_project(member_id, project_uuid):
    project = Project.objects.get(uuid=project_uuid)
    user = User.objects.get(id=member_id)

    if (not project) or (not user) or (user not in project.admins.all()):
        raise PermissionDenied(detail="You do not have admin access to this project")
