from projects.models import (
    NetworkShapeOptions,
    Page,
    Project,
    ProjectAuditParameters,
    ProjectMemberRole,
    Script,
    AvailableAuditParameters,
)

from rest_framework import serializers
from audits.serializers import AuditStatusHistorySerializer


def get_latest_audit_status_data_for_audit_parameters(obj, parameters):
    # get the latest audit for the given parameter
    latest_audit = (
        obj.audits.filter(parameters=parameters).order_by("created_at").last()
    )
    if latest_audit:
        # for this audit, get the latest auditstatus
        return AuditStatusHistorySerializer(
            latest_audit.audit_status_history.order_by("created_at").last()
        ).data
    return AuditStatusHistorySerializer().data


def get_latest_audit_status_histories(obj):
    if hasattr(obj, "project"):
        parameters_list = obj.project.audit_parameters_list.all()
        return list(
            map(
                lambda parameters: get_latest_audit_status_data_for_audit_parameters(
                    obj, parameters
                ),
                parameters_list,
            )
        )

    return list()


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    Project serializer extends this serializer to dynamically choose which fields to serialize
    see https://www.django-rest-framework.org/api-guide/serializers/#dynamically-modifying-fields
    """

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop("fields", None)

        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class PageSerializer(serializers.ModelSerializer):
    latest_audit_status_histories = serializers.SerializerMethodField(
        "resolve_latest_audit_status_histories"
    )

    def resolve_latest_audit_status_histories(self, obj):
        return get_latest_audit_status_histories(obj)

    class Meta:
        model = Page
        fields = ("uuid", "name", "url", "latest_audit_status_histories")


class ScriptSerializer(serializers.ModelSerializer):
    latest_audit_status_histories = serializers.SerializerMethodField(
        "resolve_latest_audit_status_histories"
    )

    def resolve_latest_audit_status_histories(self, obj):
        return get_latest_audit_status_histories(obj)

    class Meta:
        model = Script
        fields = ("uuid", "name", "latest_audit_status_histories")


class AvailableAuditParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableAuditParameters
        fields = ("uuid", "browser", "location_label", "location_group")


class ProjectAuditParametersSerializer(serializers.ModelSerializer):
    location = serializers.SerializerMethodField("resolve_location")
    browser = serializers.SerializerMethodField("resolve_browser")
    location_label = serializers.SerializerMethodField("resolve_location_label")

    def resolve_location(self, obj):
        return obj.configuration.location

    def resolve_location_label(self, obj):
        return obj.configuration.location_label

    def resolve_browser(self, obj):
        return obj.configuration.browser

    class Meta:
        model = ProjectAuditParameters
        fields = (
            "uuid",
            "name",
            "location_label",
            "browser",
            "network_shape",
            "location",
            "configuration",
        )


class ProjectMemberRoleSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source="user.id")
    username = serializers.ReadOnlyField(source="user.username")
    email = serializers.ReadOnlyField(source="user.email")

    class Meta:
        model = ProjectMemberRole
        fields = ("id", "email", "username", "is_admin")


class ProjectSerializer(DynamicFieldsModelSerializer):
    pages = PageSerializer(many=True)
    scripts = ScriptSerializer(many=True)
    audit_parameters_list = ProjectAuditParametersSerializer(many=True)
    project_members = ProjectMemberRoleSerializer(
        source="projectmemberrole_set", many=True
    )

    class Meta:
        model = Project
        fields = (
            "uuid",
            "name",
            "project_members",
            "pages",
            "scripts",
            "audit_parameters_list",
            "screenshot_url",
            "latest_audit_at",
            "wpt_api_key",
        )
