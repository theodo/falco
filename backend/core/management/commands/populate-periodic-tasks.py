from django.core.management.base import BaseCommand
from django_celery_beat.models import CrontabSchedule, PeriodicTask, IntervalSchedule


class Command(BaseCommand):
    help = "add default periodic tasks (3 audits per day | Fetch the available WPT configurations directly on installs | Update of available WPT configurations every night | Cleanup of old audit statuses every night)"

    def handle(self, *args, **options):
        schedule_1, _ = CrontabSchedule.objects.get_or_create(
            minute="0", hour="1", day_of_week="*", day_of_month="*", month_of_year="*"
        )
        schedule_2, _ = CrontabSchedule.objects.get_or_create(
            minute="0", hour="2", day_of_week="*", day_of_month="*", month_of_year="*"
        )
        schedule_3, _ = CrontabSchedule.objects.get_or_create(
            minute="0", hour="3", day_of_week="*", day_of_month="*", month_of_year="*"
        )
        schedule_7, _ = CrontabSchedule.objects.get_or_create(
            minute="0", hour="7", day_of_week="*", day_of_month="*", month_of_year="*"
        )
        schedule_12, _ = CrontabSchedule.objects.get_or_create(
            minute="0", hour="12", day_of_week="*", day_of_month="*", month_of_year="*"
        )
        schedule_16, _ = CrontabSchedule.objects.get_or_create(
            minute="0", hour="16", day_of_week="*", day_of_month="*", month_of_year="*"
        )

        PeriodicTask.objects.create(
            crontab=schedule_7,
            name="Run all audits 1",
            task="audits.tasks.request_all_audits",
        )
        PeriodicTask.objects.create(
            crontab=schedule_12,
            name="Run all audits 2",
            task="audits.tasks.request_all_audits",
        )
        PeriodicTask.objects.create(
            crontab=schedule_16,
            name="Run all audits 3",
            task="audits.tasks.request_all_audits",
        )

        PeriodicTask.objects.create(
            crontab=schedule_1,
            name="Get all wpt audit configurations",
            task="audits.tasks.get_wpt_audit_configurations",
        )

        PeriodicTask.objects.create(
            crontab=schedule_2,
            name="clean old audits statuses",
            task="audits.tasks.clean_old_audit_statuses",
        )
        PeriodicTask.objects.create(
            crontab=schedule_3,
            name="clean unfinished audits",
            task="audits.tasks.clean_unfinished_audits",
        )

        schedule_seconds, _ = IntervalSchedule.objects.get_or_create(
            every=1, period=IntervalSchedule.SECONDS
        )
        PeriodicTask.objects.create(
            interval=schedule_seconds,
            name="One shot update all configurations",
            task="audits.tasks.get_wpt_audit_configurations",
            one_off=True,
        )

        self.stdout.write(
            self.style.SUCCESS("Successfully genereated default Crontabs")
        )
