# from django_celery_beat.models import PeriodicTask
# from django.core.management import call_command
from django.test import TestCase
from audits.tasks import request_audit
from projects.models import (
    Page,
    Project,
    AvailableAuditParameters,
    ProjectAuditParameters,
)
from audits.models import Audit, AuditStatusHistory


class TasksTestCase(TestCase):
    def test_request_audit(self):
        project = Project.objects.create()
        page_to_audit = Page.objects.create(
            project=project, name="Page Name 1", url="https://google.com"
        )
        configuration = AvailableAuditParameters.objects.create(
            browser="testValue",
            location="testValue",
            location_label="testValue",
            location_group="testValue",
            is_active=True,
        )

        parameters = ProjectAuditParameters.objects.create(
            name="parameters name",
            configuration=configuration,
            network_shape="DSL",
            project=project,
        )
        new_page_audit = Audit.objects.create(page=page_to_audit, parameters=parameters)

        request_audit(new_page_audit.uuid)

        auditHistory = AuditStatusHistory.objects.all()

        self.assertEqual(len(auditHistory), 2)  # One request and one response
        self.assertEqual(auditHistory[0].audit.uuid, new_page_audit.uuid)
        self.assertEqual(auditHistory[1].audit.uuid, new_page_audit.uuid)
        self.assertTrue(
            auditHistory[0].status == "REQUESTED"
            or auditHistory[1].status == "REQUESTED"
        )
