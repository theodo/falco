import shlex
import subprocess

from django.core.management.base import BaseCommand
from django.utils import autoreload


# Celery autoreload workaround inspired by:
#   https://avilpage.com/2017/05/how-to-auto-reload-celery-workers-in-development.html


def restart_celery():
    cmd = "pkill -9 celery"
    subprocess.call(shlex.split(cmd))
    cmd = "celery -A root.celery worker -l INFO"
    subprocess.call(shlex.split(cmd))


class Command(BaseCommand):
    def handle(self, *args, **options):
        print("Starting celery worker with autoreload...")
        autoreload.main(restart_celery)
