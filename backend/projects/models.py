from enum import Enum

from core.models import BaseModel, User
from django.db import models
from django import forms
from fernet_fields import EncryptedTextField
from django.contrib.postgres.fields import ArrayField
from django.db.models.signals import post_save, pre_delete


class Project(BaseModel):
    name = models.CharField(max_length=100)
    wpt_api_key = models.CharField(max_length=100)
    screenshot_url = models.CharField(max_length=1000, null=True, blank=True)
    members = models.ManyToManyField(
        User, blank=True, related_name="member_of", through="ProjectMemberRole"
    )
    is_active = models.BooleanField(default=True)
    wpt_instance_url = models.CharField(
        max_length=100, blank=False, null=False, default="https://webpagetest.org"
    )

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


class ProjectMemberRole(BaseModel):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        project_member_role = super().save(*args, **kwargs)
        return project_member_role

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)

    class Meta:
        ordering = ("-is_admin", "-created_at")
        unique_together = ("project", "user")


def save_project_member(sender, instance, **kwargs):
    MetricsPreferences.objects.create(
        project=instance.project,
        user=instance.user,
        metrics=[
            "WPTMetricFirstViewTTI",
            "WPTMetricFirstViewSpeedIndex",
            "WPTMetricFirstViewLoadTime",
        ],
    )


def delete_project_member(sender, instance, **kwargs):
    MetricsPreferences.objects.filter(
        project=instance.project, user_id=instance.user.id
    ).delete()


post_save.connect(save_project_member, sender=ProjectMemberRole)
pre_delete.connect(delete_project_member, sender=ProjectMemberRole)


class MetricOptions(Enum):
    FIRST_VIEW_TTI = "WPTMetricFirstViewTTI"
    REPEAT_VIEW_TTI = "WPTMetricRepeatViewTTI"
    FIRST_VIEW_SPEED_INDEX = "WPTMetricFirstViewSpeedIndex"
    REPEAT_VIEW_SPEED_INDEX = "WPTMetricRepeatViewSpeedIndex"
    FIRST_VIEW_PAINT = "WPTMetricFirstViewFirstPaint"
    REPEAT_VIEW_FIRST_PAINT = "WPTMetricRepeatViewFirstPaint"
    FIRST_VIEW_FIRST_MEANINGFUL_PAINT = "WPTMetricFirstViewFirstMeaningfulPaint"
    REPEAT_VIEW_FIRST_MEANINGFUL_PAINT = "WPTMetricRepeatViewFirstMeaningfulPaint"
    FIRST_VIEW_LOAD_TIME = "WPTMetricFirstViewLoadTime"
    REPEAT_VIEW_LOAD_TIME = "WPTMetricRepeatViewLoadTime"
    FIRST_VIEW_FIRST_CONTENTFUL_PAINT = "WPTMetricFirstViewFirstContentfulPaint"
    REPEAT_VIEW_FIRST_CONTENTFUL_PAINT = "WPTMetricRepeatViewFirstContentfulPaint"
    FIRST_VIEW_TIME_TO_FIRST_BYTE = "WPTMetricFirstViewTimeToFirstByte"
    REPEAT_VIEW_TIME_TO_FIRST_BYTE = "WPTMetricRepeatViewTimeToFirstByte"
    FIRST_VIEW_VISUALLY_COMPLETE = "WPTMetricFirstViewVisuallyComplete"
    REPEAT_VIEW_VISUALLY_COMPLETE = "WPTMetricRepeatViewVisuallyComplete"
    LIGHTHOUSE_PERFORMANCE = "WPTMetricLighthousePerformance"


class MetricsPreferences(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    metrics = ArrayField(
        models.CharField(
            max_length=100,
            choices=[(metric.value, metric.value) for metric in MetricOptions],
        ),
        null=True,
        default=[
            "WPTMetricFirstViewTTI",
            "WPTMetricFirstViewSpeedIndex",
            "WPTMetricFirstViewLoadTime",
        ],
    )

    class Meta:
        unique_together = ("project", "user")


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
    wpt_instance_url = models.CharField(
        max_length=100, blank=False, null=False, default="https://webpagetest.org"
    )

    class Meta:
        ordering = ("location", "browser")

    def __str__(self):
        return "{} : {}".format(self.location_label, self.browser)


class Script(BaseModel):
    name = models.CharField(max_length=100, blank=False, null=False)
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
