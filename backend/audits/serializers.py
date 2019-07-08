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
    parameters = serializers.SerializerMethodField()
    page_id = serializers.SerializerMethodField()
    script_id = serializers.SerializerMethodField()

    def get_parameters(self, obj):
        return obj.audit.parameters.uuid

    def get_page_id(self, obj):
        return obj.audit.page.uuid if obj.audit.page else ""

    def get_script_id(self, obj):
        return obj.audit.script.uuid if obj.audit.script else ""

    class Meta:
        model = AuditStatusHistory
        fields = (
            "uuid",
            "created_at",
            "status",
            "details",
            "parameters",
            "page_id",
            "script_id",
        )


class AuditResultsSerializer(serializers.ModelSerializer):
    audit = AuditSerializer()

    class Meta:
        model = AuditResults
        fields = (
            "uuid",
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
            "lh_metric_tti_displayed_value",
            "lh_metric_tti_score",
            "lh_metric_first_contentful_paint_displayed_value",
            "lh_metric_first_contentful_paint_score",
            "lh_metric_speed_index_displayed_value",
            "lh_metric_speed_index_score",
            "lh_metric_first_meaningful_paint_displayed_value",
            "lh_metric_first_meaningful_paint_score",
            "lh_metric_first_cpu_idle_displayed_value",
            "lh_metric_first_cpu_idle_score",
            "lh_metric_max_potential_first_input_delay_displayed_value",
            "lh_metric_max_potential_first_input_delay_score",
        )
