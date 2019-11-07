import httpretty
import json
from django.test import TestCase, override_settings
from audits.tasks import request_audit
from projects.models import (
    Page,
    Project,
    AvailableAuditParameters,
    ProjectAuditParameters,
)
from audits.models import Audit, AuditStatusHistory
from unittest.mock import patch
from .mocks import poll_audit_results


class TasksTestCase(TestCase):
    @httpretty.activate
    @override_settings(CELERY_EAGER=True)
    @patch("audits.tasks.poll_audit_results", poll_audit_results)
    def test_request_audit(self):
        responseData = json.load(
            open("audits/tests/json_mocks/wpt_runtest_post_result.json")
        )
        bodyData = open("audits/tests/json_mocks/wpt_runtest_post_body.json").read()
        httpretty.register_uri(
            httpretty.POST, "https://www.webpagetest.org/runtest.php", body=bodyData
        )
        httpretty.register_uri(
            httpretty.GET,
            "https://www.webpagetest.org/jsonResult.php?test=191024_HA_976b046886025ec8693cbe4f1145929e",
            body=responseData,
        )
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

        request_audit.s(audit_uuid=new_page_audit.uuid).apply()

        auditHistory = AuditStatusHistory.objects.all()

        self.assertEqual(len(auditHistory), 2)  # One request and one response
        self.assertEqual(auditHistory[0].audit.uuid, new_page_audit.uuid)
        self.assertEqual(auditHistory[1].audit.uuid, new_page_audit.uuid)
        self.assertTrue(
            auditHistory[0].status == "REQUESTED"
            or auditHistory[1].status == "REQUESTED"
        )
        poll_audit_results.apply_async.assert_called_with(
            (
                new_page_audit.uuid,
                "https://www.webpagetest.org/jsonResult.php?test=191024_HA_976b046886025ec8693cbe4f1145929e",
            ),
            countdown=15,
        )
