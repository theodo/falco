from enum import Enum
from core.models import BaseModel
from django.contrib.postgres.fields import JSONField
from django.db import models
from projects.models import Page, ProjectAuditParameters, Script
from django.utils import timezone


class AvailableStatuses(Enum):  # A subclass of Enum
    REQUESTED = "REQUESTED"
    QUEUEING = "QUEUEING"
    RUNNING = "RUNNING"
    PENDING = "PENDING"
    ERROR = "ERROR"
    SUCCESS = "SUCCESS"


class Audit(BaseModel):
    page = models.ForeignKey(
        Page, related_name="audits", on_delete=models.CASCADE, blank=True, null=True
    )
    script = models.ForeignKey(
        Script, related_name="audits", on_delete=models.CASCADE, blank=True, null=True
    )
    parameters = models.ForeignKey(
        ProjectAuditParameters,
        related_name="audits",
        on_delete=models.CASCADE,
        null=True,
    )

    def __str__(self):
        if self.page is not None:
            project_name = self.page.project.name
            audit_name = self.page.name
        elif self.script is not None:
            project_name = self.script.project.name
            audit_name = self.script.name
        return "%s — %s (%s) | % s" % (
            project_name,
            audit_name,
            str(self.parameters),
            timezone.localtime(self.created_at),
        )

    def get_project(self):
        if self.page is not None:
            return self.page.project
        elif self.script is not None:
            return self.script.project
        else:
            raise Exception("Malformed audit: no page and no script")

    def get_wpt_instance_url(self):
        project = self.get_project()
        return project.wpt_instance_url


class AuditStatusHistory(BaseModel):
    audit = models.ForeignKey(
        Audit, related_name="audit_status_history", on_delete=models.CASCADE
    )
    status = models.CharField(
        max_length=10,
        choices=[(status.name, status.value) for status in AvailableStatuses],
    )
    details = models.CharField(max_length=1000)
    info = JSONField(null=True)


class AuditResults(BaseModel):
    audit = models.ForeignKey(Audit, on_delete=models.CASCADE)
    wpt_results_json_url = models.CharField(max_length=1000)
    wpt_results_user_url = models.CharField(max_length=1000)
    wpt_metric_first_view_tti = models.IntegerField(blank=True, null=True)
    wpt_metric_repeat_view_tti = models.IntegerField(blank=True, null=True)
    wpt_metric_first_view_speed_index = models.IntegerField(blank=True, null=True)
    wpt_metric_repeat_view_speed_index = models.IntegerField(blank=True, null=True)
    wpt_metric_first_view_first_paint = models.IntegerField(blank=True, null=True)
    wpt_metric_repeat_view_first_paint = models.IntegerField(blank=True, null=True)
    wpt_metric_first_view_first_meaningful_paint = models.IntegerField(
        blank=True, null=True
    )
    wpt_metric_repeat_view_first_meaningful_paint = models.IntegerField(
        blank=True, null=True
    )
    wpt_metric_first_view_load_time = models.IntegerField(blank=True, null=True)
    wpt_metric_repeat_view_load_time = models.IntegerField(blank=True, null=True)
    wpt_metric_first_view_first_contentful_paint = models.IntegerField(
        blank=True, null=True
    )
    wpt_metric_repeat_view_first_contentful_paint = models.IntegerField(
        blank=True, null=True
    )
    wpt_metric_first_view_time_to_first_byte = models.IntegerField(
        blank=True, null=True
    )
    wpt_metric_repeat_view_time_to_first_byte = models.IntegerField(
        blank=True, null=True
    )
    wpt_metric_first_view_visually_complete = models.IntegerField(blank=True, null=True)
    wpt_metric_repeat_view_visually_complete = models.IntegerField(
        blank=True, null=True
    )
    wpt_metric_lighthouse_performance = models.FloatField(blank=True, null=True)
    script_step_name = models.CharField(max_length=100, blank=True, null=True)
    script_step_number = models.IntegerField(blank=True, null=True)
    lh_metric_tti_displayed_value = models.CharField(
        max_length=100, blank=True, null=True
    )
    lh_metric_tti_score = models.FloatField(blank=True, null=True)
    lh_metric_first_contentful_paint_displayed_value = models.CharField(
        max_length=100, blank=True, null=True
    )
    lh_metric_first_contentful_paint_score = models.FloatField(blank=True, null=True)
    lh_metric_speed_index_displayed_value = models.CharField(
        max_length=100, blank=True, null=True
    )
    lh_metric_speed_index_score = models.FloatField(blank=True, null=True)
    lh_metric_first_meaningful_paint_displayed_value = models.CharField(
        max_length=100, blank=True, null=True
    )
    lh_metric_first_meaningful_paint_score = models.FloatField(blank=True, null=True)
    lh_metric_first_cpu_idle_displayed_value = models.CharField(
        max_length=100, blank=True, null=True
    )
    lh_metric_first_cpu_idle_score = models.FloatField(blank=True, null=True)
    lh_metric_max_potential_first_input_delay_displayed_value = models.CharField(
        max_length=100, blank=True, null=True
    )
    lh_metric_max_potential_first_input_delay_score = models.FloatField(
        blank=True, null=True
    )
