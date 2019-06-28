from projects.models import (
    NetworkShapeOptions,
    Page,
    Project,
    ProjectAuditParameters,
    Script,
)
from rest_framework import serializers
from audits.serializers import AuditStatusHistorySerializer


def get_latest_audit_status_histories(obj):
    parameters_list = obj.project.audit_parameters_list.all()
    return [
        AuditStatusHistorySerializer(
            obj.audits.filter(parameters=parameters)
            .order_by("-created_at")
            .first()
            .audit_status_history.order_by("-created_at")
            .first()
        ).data
        for parameters in parameters_list
    ]


class PageSerializer(serializers.ModelSerializer):
    latest_audit_status_histories = serializers.SerializerMethodField(
        "resolve_latest_audit_status_histories"
    )

    def resolve_latest_audit_status_histories(self, obj):
        return get_latest_audit_status_histories(obj)

    class Meta:
        model = Page
        fields = ("uuid", "name", "url", "audits", "latest_audit_status_histories")


class ScriptSerializer(serializers.ModelSerializer):
    latest_audit_status_histories = serializers.SerializerMethodField(
        "resolve_latest_audit_status_histories"
    )

    def resolve_latest_audit_status_histories(self, obj):
        return get_latest_audit_status_histories(obj)

    class Meta:
        model = Script
        fields = ("uuid", "name", "audits", "latest_audit_status_histories")


class ProjectAuditParametersSerializer(serializers.ModelSerializer):
    network_shape = serializers.SerializerMethodField("resolve_network_shape")
    location = serializers.SerializerMethodField("resolve_location")
    browser = serializers.SerializerMethodField("resolve_browser")

    def resolve_network_shape(self, obj):
        return NetworkShapeOptions[obj.network_shape].value

    def resolve_location(self, obj):
        return obj.configuration.location

    def resolve_browser(self, obj):
        return obj.configuration.browser

    class Meta:
        model = ProjectAuditParameters
        fields = ("uuid", "name", "location", "browser", "network_shape")


class ProjectSerializer(serializers.ModelSerializer):
    pages = PageSerializer(many=True)
    scripts = ScriptSerializer(many=True)
    audit_parameters_list = ProjectAuditParametersSerializer(many=True)

    class Meta:
        model = Project
        fields = (
            "uuid",
            "name",
            "pages",
            "scripts",
            "audit_parameters_list",
            "screenshot_url",
            "latest_audit_at",
        )
