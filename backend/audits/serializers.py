from audits.models import Audit, AuditResults, AuditStatusHistory
from rest_framework import serializers


class AuditSerializer(serializers.ModelSerializer):
    parameters = serializers.PrimaryKeyRelatedField(read_only=True)
    page = serializers.PrimaryKeyRelatedField(read_only=True)
    script = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Audit
        fields = ("uuid", "parameters", "page", "script")


class AuditStatusHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditStatusHistory
        fields = ("created_at", "status", "details")


class AuditResultsSerializer(serializers.ModelSerializer):
    audit = AuditSerializer()

    class Meta:
        model = AuditResults
        fields = (
            "audit",
            "created_at",
            "wpt_results_json_url",
            "wpt_results_user_url",
            "wpt_metric_first_view_tti",
            "wpt_metric_repeat_view_tti",
            "wpt_metric_first_view_speed_index",
            "wpt_metric_repeat_view_speed_index",
            "wpt_metric_first_view_first_paint",
            "wpt_metric_repeat_view_first_paint",
            "wpt_metric_first_view_first_meaningful_paint",
            "wpt_metric_repeat_view_first_meaningful_paint",
            "wpt_metric_first_view_load_time",
            "wpt_metric_repeat_view_load_time",
            "wpt_metric_first_view_first_contentful_paint",
            "wpt_metric_repeat_view_first_contentful_paint",
            "wpt_metric_first_view_time_to_first_byte",
            "wpt_metric_repeat_view_time_to_first_byte",
            "wpt_metric_lighthouse_performance",
            "script_step_name",
            "script_step_number",
        )
