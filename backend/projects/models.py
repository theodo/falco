from enum import Enum
from core.models import BaseModel
from django.db import models


class Project(BaseModel):
    name = models.CharField(max_length=100)
    wpt_api_key = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Page(BaseModel):
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=500)
    project = models.ForeignKey(Project, related_name="pages", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("name",)


class NetworkShapeOptions(Enum):
    CABLE = "Cable"
    DSL = "DSL"
    THREE_G_SLOW = "3GSlow"
    THREE_G = "3G"
    THREE_G_FAST = "3GFast"
    FOUR_G = "4G"
    LTE = "LTE"
    EDGE = "Edge"
    TWO_G = "2G"
    DIAL = "Dial"
    FIOS = "FIOS"
    NATIVE = "Native"
    CUSTOM = "custom"


class ProjectAuditParameters(BaseModel):
    browser = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    network_shape = models.CharField(
        max_length=20,
        choices=[(network_shape.value, network_shape.value) for network_shape in NetworkShapeOptions],
    )
    project = models.ForeignKey(Project, related_name="audit_parameters_list", on_delete=models.CASCADE)
