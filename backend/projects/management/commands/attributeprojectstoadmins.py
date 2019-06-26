from django.core.management.base import BaseCommand
from core.models import User
from projects.models import Project


class Command(BaseCommand):
    help = "Attributes all the projects to the admins"

    def add_arguments(self, parser):
        # Named (optional) arguments
        parser.add_argument(
            "-k", "--key", type=str, help="Put admin WPT API key to all projects"
        )

    def handle(self, *args, **options):
        for project in Project.objects.all():
            project.admins.add(*list(User.objects.filter(is_superuser=True)))
            project.wpt_api_key = (
                options.get("key") if options.get("key") else "---TO CHANGE---"
            )
            project.save()
