# Generated by Django 2.2 on 2019-09-04 09:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [("projects", "0027_export_project_members_and_admins")]

    operations = [
        migrations.AlterModelOptions(
            name="projectmemberrole", options={"ordering": ("-is_admin", "-created_at")}
        )
    ]