from projects.models import Page, Project, ProjectAuditParameters
from rest_framework import serializers


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ("uuid", "name", "url", "audits")


class ProjectAuditParametersSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectAuditParameters
        fields = ("uuid", "location", "browser", "network_shape")


class ProjectSerializer(serializers.ModelSerializer):
    pages = PageSerializer(many=True)
    audit_parameters_list = ProjectAuditParametersSerializer(many=True)

    class Meta:
        model = Project
        fields = ("uuid", "name", "pages", "audit_parameters_list")
