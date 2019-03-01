import dayjs from 'dayjs';

import { ApiAuditResultType, AuditResultType } from './types';

export const modelizeAuditResults = (
  auditResults: ApiAuditResultType[],
): Record<string, AuditResultType> => {
  return auditResults.reduce((auditResultsById, auditResult) => {
    return {
      ...auditResultsById,
      [auditResult.audit.uuid]: {
        auditId: auditResult.audit.uuid,
        createdAt: dayjs(auditResult.created_at),
        WPTResultsJsonUrl: auditResult.wpt_results_json_url,
        WPTMetricFirstViewTTI: auditResult.wpt_metric_first_view_tti,
        WPTMetricRepeatViewTTI: auditResult.wpt_metric_repeat_view_tti,
        WPTMetricFirstViewSpeedIndex: auditResult.wpt_metric_first_view_speed_index,
        WPTMetricRepeatViewSpeedIndex: auditResult.wpt_metric_repeat_view_speed_index,
        WPTMetricFirstViewFirstPaint: auditResult.wpt_metric_first_view_first_paint,
        WPTMetricRepeatViewFirstPaint: auditResult.wpt_metric_repeat_view_first_paint,
        WPTMetricFirstViewFirstMeaningfulPaint:
          auditResult.wpt_metric_first_view_first_meaningful_paint,
        WPTMetricRepeatViewFirstMeaningfulPaint:
          auditResult.wpt_metric_repeat_view_first_meaningful_paint,
        WPTMetricFirstViewLoadTime: auditResult.wpt_metric_first_view_load_time,
        WPTMetricRepeatViewLoadTime: auditResult.wpt_metric_repeat_view_load_time,
        WPTMetricFirstViewFirstContentfulPaint:
          auditResult.wpt_metric_first_view_first_contentful_paint,
        WPTMetricRepeatViewFirstContentfulPaint:
          auditResult.wpt_metric_repeat_view_first_contentful_paint,
        WPTMetricFirstViewTimeToFirstByte: auditResult.wpt_metric_first_view_time_to_first_byte,
        WPTMetricRepeatViewTimeToFirstByte: auditResult.wpt_metric_repeat_view_time_to_first_byte,
        WPTMetricLighthousePerformance: auditResult.wpt_metric_lighthouse_performance,
      },
    };
  }, {});
};

export const getSortAuditResultsId = (auditResults: AuditResultType[]) => {
  return auditResults
    .sort(
      (firstAuditResult, secondAuditResult) =>
        secondAuditResult.createdAt.valueOf() - firstAuditResult.createdAt.valueOf(),
    )
    .map(auditResult => auditResult.auditId);
};
