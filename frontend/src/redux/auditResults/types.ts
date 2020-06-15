import dayjs from 'dayjs';

export interface AuditResultType {
  auditId: string;
  createdAt: dayjs.Dayjs;
  WPTResultsJsonUrl: string;
  WPTResultsUserUrl: string;
  WPTMetricFirstViewTTI: number;
  WPTMetricRepeatViewTTI: number;
  WPTMetricFirstViewSpeedIndex: number;
  WPTMetricRepeatViewSpeedIndex: number;
  WPTMetricFirstViewFirstPaint: number;
  WPTMetricRepeatViewFirstPaint: number;
  WPTMetricFirstViewFirstMeaningfulPaint: number;
  WPTMetricRepeatViewFirstMeaningfulPaint: number;
  WPTMetricFirstViewLoadTime: number;
  WPTMetricRepeatViewLoadTime: number;
  WPTMetricFirstViewFirstContentfulPaint: number;
  WPTMetricRepeatViewFirstContentfulPaint: number;
  WPTMetricFirstViewTimeToFirstByte: number;
  WPTMetricRepeatViewTimeToFirstByte: number;
  WPTMetricFirstViewVisuallyComplete: number;
  WPTMetricRepeatViewVisuallyComplete: number;
  WPTMetricLighthousePerformance: number;
  scriptStepName: string | null;
  scriptStepNumber: string | null;
  lighthouseTTI: {
    displayedValue: string;
    score: number;
  };
  lighthouseSpeedIndex: {
    displayedValue: string;
    score: number;
  };
  lighthouseFirstContentfulPaint: {
    displayedValue: string;
    score: number;
  };
  lighthouseFirstMeaningfulPaint: {
    displayedValue: string;
    score: number;
  };
  lighthouseFirstCPUIdle: {
    displayedValue: string;
    score: number;
  };
  lighthouseMaxPotentialFirstInputDelay: {
    displayedValue: string;
    score: number;
  };
}

export interface SortedPageAuditResultIds {
  byAuditParametersId: Record<string, string[]>;
}

export interface SortedScriptAuditResultIds {
  byAuditParametersId: Record<string, Record<string, string[]>>;
}

export type MetricType =
  | 'WPTMetricFirstViewTTI'
  | 'WPTMetricRepeatViewTTI'
  | 'WPTMetricFirstViewSpeedIndex'
  | 'WPTMetricRepeatViewSpeedIndex'
  | 'WPTMetricFirstViewFirstPaint'
  | 'WPTMetricRepeatViewFirstPaint'
  | 'WPTMetricFirstViewFirstMeaningfulPaint'
  | 'WPTMetricRepeatViewFirstMeaningfulPaint'
  | 'WPTMetricFirstViewLoadTime'
  | 'WPTMetricRepeatViewLoadTime'
  | 'WPTMetricFirstViewFirstContentfulPaint'
  | 'WPTMetricRepeatViewFirstContentfulPaint'
  | 'WPTMetricFirstViewTimeToFirstByte'
  | 'WPTMetricRepeatViewTimeToFirstByte'
  | 'WPTMetricFirstViewVisuallyComplete'
  | 'WPTMetricRepeatViewVisuallyComplete'
  | 'WPTMetricLighthousePerformance';

export type LighthouseMetricType =
  | 'lighthouseFirstContentfulPaint'
  | 'lighthouseSpeedIndex'
  | 'lighthouseTTI'
  | 'lighthouseFirstMeaningfulPaint'
  | 'lighthouseFirstCPUIdle'
  | 'lighthouseMaxPotentialFirstInputDelay';

export interface MetricConstantForGraph {
  type: 'time' | 'number' | 'percent';
  colorDark: string;
  colorLight: string;
}

export interface ApiAuditResultType {
  audit: {
    uuid: string;
    page: string;
  };
  uuid: string;
  created_at: string;
  wpt_results_json_url: string;
  wpt_results_user_url: string;
  wpt_metric_first_view_tti: number;
  wpt_metric_repeat_view_tti: number;
  wpt_metric_first_view_speed_index: number;
  wpt_metric_repeat_view_speed_index: number;
  wpt_metric_first_view_first_paint: number;
  wpt_metric_repeat_view_first_paint: number;
  wpt_metric_first_view_first_meaningful_paint: number;
  wpt_metric_repeat_view_first_meaningful_paint: number;
  wpt_metric_first_view_load_time: number;
  wpt_metric_repeat_view_load_time: number;
  wpt_metric_first_view_first_contentful_paint: number;
  wpt_metric_repeat_view_first_contentful_paint: number;
  wpt_metric_first_view_time_to_first_byte: number;
  wpt_metric_repeat_view_time_to_first_byte: number;
  wpt_metric_first_view_visually_complete: number;
  wpt_metric_repeat_view_visually_complete: number;
  wpt_metric_lighthouse_performance: number;
  script_step_name: string;
  script_step_number: number;
  lh_metric_tti_displayed_value: string;
  lh_metric_tti_score: number;
  lh_metric_first_contentful_paint_displayed_value: string;
  lh_metric_first_contentful_paint_score: number;
  lh_metric_speed_index_displayed_value: string;
  lh_metric_speed_index_score: number;
  lh_metric_first_meaningful_paint_displayed_value: string;
  lh_metric_first_meaningful_paint_score: number;
  lh_metric_first_cpu_idle_displayed_value: string;
  lh_metric_first_cpu_idle_score: number;
  lh_metric_max_potential_first_input_delay_displayed_value: string;
  lh_metric_max_potential_first_input_delay_score: number;
}

export type AuditResultsAsGraphDataDate = Record<'date', number>;

export type AuditResultsAsGraphDataMetric = Partial<Record<MetricType, number>>;

export type AuditResultsAsGraphDataScript = Record<'scriptStepName', string | null>;

export type AuditResultsAsGraphDataItem = AuditResultsAsGraphDataDate &
  AuditResultsAsGraphDataMetric &
  AuditResultsAsGraphDataScript;

export type AuditResultsAsGraphData = AuditResultsAsGraphDataItem[] | null;
