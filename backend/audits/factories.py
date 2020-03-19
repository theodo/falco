import factory
from datetime import datetime

from . import models
from projects.factories import PageFactory, ProjectAuditParametersFactory


class AuditFactory(factory.DjangoModelFactory):
    class Meta:
        model = models.Audit
        django_get_or_create = ("page", "parameters", "created_at")

    page = PageFactory()
    parameters = ProjectAuditParametersFactory()
    created_at = factory.LazyFunction(datetime.now)


class AuditStatusHistoryFactory(factory.DjangoModelFactory):
    class Meta:
        model = models.AuditStatusHistory
        django_get_or_create = ("audit", "status")

    audit = AuditFactory()
    status = models.AvailableStatuses.SUCCESS.value


class AuditResultsFactory(factory.DjangoModelFactory):
    class Meta:
        model = models.AuditResults

    audit = AuditFactory()
    wpt_results_json_url = "https://www.webpagetest.org/jsonResult.php?test=200319_SG_5a702cf8c430e2e61bda902f5fd80554&pretty=1"
    wpt_results_user_url = (
        "https://www.webpagetest.org/result/200319_SG_5a702cf8c430e2e61bda902f5fd80554/"
    )
    wpt_metric_first_view_tti = 2000
    wpt_metric_repeat_view_tti = 2000
    wpt_metric_first_view_speed_index = 2000
    wpt_metric_repeat_view_speed_index = 2000
    wpt_metric_first_view_first_paint = 2000
    wpt_metric_repeat_view_first_paint = 2000
    wpt_metric_first_view_first_meaningful_paint = 2000
    wpt_metric_repeat_view_first_meaningful_paint = 2000
    wpt_metric_first_view_load_time = 2000
    wpt_metric_repeat_view_load_time = 2000
    wpt_metric_first_view_first_contentful_paint = 2000
    wpt_metric_repeat_view_first_contentful_paint = 2000
    wpt_metric_first_view_time_to_first_byte = 2000
    wpt_metric_repeat_view_time_to_first_byte = 2000
    wpt_metric_first_view_visually_complete = 2000
    wpt_metric_repeat_view_visually_complete = 2000
    wpt_metric_lighthouse_performance = 0.8
    script_step_name = 2000
    script_step_number = 2000
    lh_metric_tti_displayed_value = "2 s"
    lh_metric_tti_score = 0.8
    lh_metric_first_contentful_paint_displayed_value = "2 s"
    lh_metric_first_contentful_paint_score = 0.8
    lh_metric_speed_index_displayed_value = "2 s"
    lh_metric_speed_index_score = 0.8
    lh_metric_first_meaningful_paint_displayed_value = "2 s"
    lh_metric_first_meaningful_paint_score = 0.8
    lh_metric_first_cpu_idle_displayed_value = "2 s"
    lh_metric_first_cpu_idle_score = 0.8
    lh_metric_max_potential_first_input_delay_displayed_value = "2 s"
    lh_metric_max_potential_first_input_delay_score = 0.8
