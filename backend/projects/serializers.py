from projects.models import NetworkShapeOptions, Page, Project, ProjectAuditParameters
from rest_framework import serializers


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ("uuid", "name", "url", "audits")


class ProjectAuditParametersSerializer(serializers.ModelSerializer):
    network_shape = serializers.SerializerMethodField("resolve_network_shape")

    def resolve_network_shape(self, obj):
        return NetworkShapeOptions[obj.network_shape].value

    class Meta:
        model = ProjectAuditParameters
        fields = ("uuid", "location", "browser", "network_shape")


class ProjectSerializer(serializers.ModelSerializer):
    pages = PageSerializer(many=True)
    audit_parameters_list = ProjectAuditParametersSerializer(many=True)

    class Meta:
        model = Project
        fields = ("uuid", "name", "pages", "audit_parameters_list", "screenshot_url")
