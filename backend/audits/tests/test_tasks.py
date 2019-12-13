import httpretty
from unittest.mock import MagicMock
from django.test import TestCase
from audits.tasks import request_audit, get_wpt_audit_configurations
from projects.models import (
    Page,
    Project,
    AvailableAuditParameters,
    ProjectAuditParameters,
)
from audits.models import Audit, AuditStatusHistory
from unittest.mock import patch


class TasksTestCase(TestCase):
    @httpretty.activate
    @patch("audits.tasks.poll_audit_results")
    def test_request_audit(self, poll_audit_results_mock):
        poll_audit_results_mock.apply_async = MagicMock()
        POST_runtest_data = open("audits/tests/json_mocks/wpt_POST_runtest.json").read()
        GET_jsonResults_data = open(
            "audits/tests/json_mocks/wpt_GET_jsonResult.json"
        ).read()
        httpretty.register_uri(
            httpretty.POST,
            "https://webpagetest.org/runtest.php",
            body=POST_runtest_data,
        )
        httpretty.register_uri(
            httpretty.GET,
            "https://webpagetest.org/jsonResult.php?test=191024_HA_976b046886025ec8693cbe4f1145929e",
            body=GET_jsonResults_data,
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

        request_audit(audit_uuid=new_page_audit.uuid)

        auditHistory = AuditStatusHistory.objects.all()

        self.assertEqual(len(auditHistory), 2)  # One request and one response
        self.assertEqual(auditHistory[0].audit.uuid, new_page_audit.uuid)
        self.assertEqual(auditHistory[1].audit.uuid, new_page_audit.uuid)
        self.assertTrue(
            auditHistory[0].status == "REQUESTED"
            or auditHistory[1].status == "REQUESTED"
        )
        poll_audit_results_mock.apply_async.assert_called_with(
            (
                new_page_audit.uuid,
                "https://www.webpagetest.org/jsonResult.php?test=191024_HA_976b046886025ec8693cbe4f1145929e",
            ),
            countdown=15,
        )

    @httpretty.activate
    def test_get_wpt_audit_configurations__create_configurations_for_default_instance(
        self
    ):
        GET_getLocations_data = open(
            "audits/tests/json_mocks/wpt_GET_getLocations.json"
        ).read()
        httpretty.register_uri(
            httpretty.GET,
            "https://webpagetest.org/getLocations.php?f=json&k=A",
            body=GET_getLocations_data,
        )
        get_wpt_audit_configurations()
        available_audit_parameters = AvailableAuditParameters.objects.all()
        self.assertEqual(len(available_audit_parameters), 3)

    @httpretty.activate
    def test_get_wpt_audit_configurations__create_configurations_for_private_instance(
        self
    ):
        GET_getLocations_data = open(
            "audits/tests/json_mocks/wpt_GET_getLocations.json"
        ).read()
        private_instance_name = "http://myprivateinstance.com"
        httpretty.register_uri(
            httpretty.GET,
            f"{private_instance_name}/getLocations.php?f=json&k=",
            body=GET_getLocations_data,
        )
        get_wpt_audit_configurations(private_instance_name)
        available_audit_parameters = AvailableAuditParameters.objects.all()
        self.assertEqual(len(available_audit_parameters), 3)
