import dayjs from 'dayjs';

import { ApiAuditStatusHistoryType, AuditStatusHistoryType } from 'redux/entities/projects/types';
import { ApiAuditResultType, AuditResultType } from './types';

export const modelizeAuditResultsForPage = (
  auditResults: ApiAuditResultType[],
): Record<string, AuditResultType> => {
  return auditResults.reduce((auditResultsById, auditResult) => {
    return {
      ...auditResultsById,
      [auditResult.uuid]: {
        auditId: auditResult.uuid,
        createdAt: dayjs(auditResult.created_at),
        WPTResultsJsonUrl: auditResult.wpt_results_json_url,
        WPTResultsUserUrl: auditResult.wpt_results_user_url,
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
        scriptStepName: auditResult.script_step_name,
        scriptStepNumber: auditResult.script_step_number,
        lighthouseTTI: {
          displayed_value: auditResult.lh_metric_tti_displayed_value,
          score: auditResult.lh_metric_tti_score,
        },
        lighthouseSpeedIndex: {
          displayed_value: auditResult.lh_metric_speed_index_displayed_value,
          score: auditResult.lh_metric_speed_index_score,
        },
        lighthouseFirstContentfulPaint: {
          displayed_value: auditResult.lh_metric_first_contentful_paint_displayed_value,
          score: auditResult.lh_metric_first_contentful_paint_score,
        },
        lighthouseFirstMeaningfulPaint: {
          displayed_value: auditResult.lh_metric_first_meaningful_paint_displayed_value,
          score: auditResult.lh_metric_first_meaningful_paint_score,
        },
        lighthouseFirstCPUIdle: {
          displayed_value: auditResult.lh_metric_first_cpu_idle_displayed_value,
          score: auditResult.lh_metric_first_cpu_idle_score,
        },
        lighthouseMaxPotentialFirstInputDelay: {
          displayed_value: auditResult.lh_metric_max_potential_first_input_delay_displayed_value,
          score: auditResult.lh_metric_max_potential_first_input_delay_score,
        },
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

export const modelizeAuditStatusHistory = (auditStatusHistory: ApiAuditStatusHistoryType): AuditStatusHistoryType => {
  return {
    createdAt: auditStatusHistory.created_at,
    status: auditStatusHistory.status,
    details: auditStatusHistory.details,
    auditParametersId: auditStatusHistory.parameters
  };
}
