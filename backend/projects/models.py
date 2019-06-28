from enum import Enum

from core.models import BaseModel, User
from django.db import models
from django import forms
from fernet_fields import EncryptedTextField


class Project(BaseModel):
    name = models.CharField(max_length=100)
    wpt_api_key = models.CharField(max_length=100)
    screenshot_url = models.CharField(max_length=1000, null=True, blank=True)
    members = models.ManyToManyField(User, blank=True, related_name="member_of")
    admins = models.ManyToManyField(User, blank=True, related_name="admin_of")
    is_active = models.BooleanField(default=True)

    @property
    def latest_audit_at(self):
        latest_page_audit_date = None
        latest_script_audit_date = None

        any_page = self.pages.first()
        any_script = self.scripts.first()

        if any_page is not None:
            latest_page_audit_date = any_page.audits.latest("created_at").created_at

        if any_script is not None:
            latest_script_audit_date = any_script.audits.latest("created_at").created_at

        if latest_page_audit_date is None:
            return latest_script_audit_date

        if latest_script_audit_date is None:
            return latest_page_audit_date

        return max(latest_page_audit_date, latest_script_audit_date)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("name",)


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
    name = models.CharField(max_length=100)
    configuration = models.ForeignKey(
        "AvailableAuditParameters", null=False, on_delete=models.PROTECT
    )
    network_shape = models.CharField(
        max_length=20,
        choices=[
            (network_shape.name, network_shape.value)
            for network_shape in NetworkShapeOptions
        ],
    )
    project = models.ForeignKey(
        Project, related_name="audit_parameters_list", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class AvailableAuditParameters(BaseModel):
    browser = models.CharField(max_length=100, blank=False, null=False)
    location = models.CharField(max_length=100, blank=False, null=False)
    location_label = models.CharField(max_length=100, blank=False, null=False)
    location_group = models.CharField(max_length=100, blank=False, null=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ("location", "browser")

    def __str__(self):
        return "{} : {}".format(self.location_label, self.browser)


class Script(BaseModel):
    name = models.CharField(max_length=100)
    script = EncryptedTextField()
    project = models.ForeignKey(
        Project, related_name="scripts", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class ScriptForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(ScriptForm, self).__init__(*args, **kwargs)
        self.fields["script"].strip = False

    class Meta:
        model = Script
        fields = "__all__"
