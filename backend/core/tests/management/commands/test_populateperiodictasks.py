from django_celery_beat.models import PeriodicTask
from django.core.management import call_command
from django.test import TestCase


class PopulatePeriodicTasksTest(TestCase):
    def test_nb_of_periodicTasks_generated(self):
        nb_tasks_before_command = len(PeriodicTask.objects.all())
        call_command("populate-periodic-tasks")
        nb_tasks_after_command = len(PeriodicTask.objects.all())

        self.assertEqual(nb_tasks_after_command - nb_tasks_before_command, 6)
