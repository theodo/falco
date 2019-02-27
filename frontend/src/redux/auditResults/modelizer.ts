import { ApiAuditResultType } from './types';
import dayjs from 'dayjs';

export const modelizeAuditResults = (auditResults: ApiAuditResultType[]) => {
  return auditResults.reduce((auditResultsById, auditResult) => {
    return {
      ...auditResultsById,
      [auditResult.audit.uuid]: {
        auditId: auditResult.audit.uuid,
        createdAt: dayjs(auditResult.created_at),
        wptResultsJsonUrl: auditResult.wpt_results_json_url,
        wptMetricFirstViewTti: auditResult.wpt_metric_first_view_tti,
        wptMetricRepeatViewTti: auditResult.wpt_metric_repeat_view_tti,
        wptMetricFirstViewSpeedIndex: auditResult.wpt_metric_first_view_speed_index,
        wptMetricRepeatViewSpeedIndex: auditResult.wpt_metric_repeat_view_speed_index,
        wptMetricFirstViewFirstPaint: auditResult.wpt_metric_first_view_first_paint,
        wptMetricRepeatViewFirstPaint: auditResult.wpt_metric_repeat_view_first_paint,
        wptMetricFirstViewFirstMeaningfulPaint:
          auditResult.wpt_metric_first_view_first_meaningful_paint,
        wptMetricRepeatViewFirstMeaningfulPaint:
          auditResult.wpt_metric_repeat_view_first_meaningful_paint,
        wptMetricFirstViewLoadTime: auditResult.wpt_metric_first_view_load_time,
        wptMetricRepeatViewLoadTime: auditResult.wpt_metric_repeat_view_load_time,
        wptMetricFirstViewFirstContentfulPaint:
          auditResult.wpt_metric_first_view_first_contentful_paint,
        wptMetricRepeatViewFirstContentfulPaint:
          auditResult.wpt_metric_repeat_view_first_contentful_paint,
        wptMetricFirstViewTimeToFirstByte: auditResult.wpt_metric_first_view_time_to_first_byte,
        wptMetricRepeatViewTimeToFirstByte: auditResult.wpt_metric_repeat_view_time_to_first_byte,
        wptMetricLighthousePerformance: auditResult.wpt_metric_lighthouse_performance,
      },
    };
  }, {});
};
