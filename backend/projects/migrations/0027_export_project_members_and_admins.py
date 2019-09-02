from django.db import migrations


def create_project_member_role_from_members(apps, schema_editor):
    Projects = apps.get_model("projects", "Project")
    ProjectMemberRole = apps.get_model("projects", "ProjectMemberRole")
    for row in Projects.objects.all():
        for admin in row.admins.all():
            ProjectMemberRole.objects.create(
                project_id=row.uuid, user_id=admin.id, is_admin=True
            )
        for member in row.members.all():
            if not ProjectMemberRole.objects.filter(
                project_id=row.uuid, user_id=member.id
            ):
                ProjectMemberRole.objects.create(
                    project_id=row.uuid, user_id=member.id, is_admin=False
                )


def delete_project_member_roles(apps, schema_editor):
    ProjectMemberRole = apps.get_model("projects", "ProjectMemberRole")
    ProjectMemberRole.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [("projects", "0026_auto_20190828_1748")]

    operations = [
        migrations.RunPython(
            create_project_member_role_from_members,
            reverse_code=delete_project_member_roles,
        )
    ]
