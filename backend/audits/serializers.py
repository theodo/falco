from audits.models import Audit, AuditResults, AuditStatusHistory
from projects.serializers import PageSerializer
from rest_framework import serializers


class AuditSerializer(serializers.ModelSerializer):
    page = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Audit
        fields = ("uuid", "page")


class AuditStatusHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditStatusHistory
        fields = ("created_at", "status", "details")


class AuditResultsSerializer(serializers.ModelSerializer):
    audit = AuditSerializer()

    class Meta:
        model = AuditResults
        fields = ("audit", "wpt_metric_tti")
