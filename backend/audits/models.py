from enum import Enum

from core.models import BaseModel
from django.db import models
from projects.models import Page


class AvailableStatuses(Enum):  # A subclass of Enum
    PENDING = "PENDING"
    ERROR = "ERROR"
    SUCCESS = "SUCCESS"


class Audit(BaseModel):
    page = models.ForeignKey(Page, related_name="audits", on_delete=models.CASCADE)


class AuditStatusHistory(BaseModel):
    audit = models.ForeignKey(
        Audit, related_name="audit_status_history", on_delete=models.CASCADE
    )
    status = models.CharField(
        max_length=10,
        choices=[(status.name, status.value) for status in AvailableStatuses],
    )
    details = models.CharField(max_length=1000)


class AuditResults(BaseModel):
    audit = models.OneToOneField(Audit, on_delete=models.CASCADE)
    wpt_results_json_url = models.CharField(max_length=1000)
    wpt_metric_tti = models.IntegerField()
