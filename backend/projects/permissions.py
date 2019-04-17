from rest_framework.exceptions import PermissionDenied
from core.models import User
from projects.models import Project


def check_if_member_of_project(member_id, project_uuid):
    project = Project.objects.get(uuid=project_uuid)
    member = User.objects.get(id=member_id)

    if (not project) or (not member) or (member not in project.members.all()):
        raise PermissionDenied(
            detail="You are not authorized to access to this project"
        )
