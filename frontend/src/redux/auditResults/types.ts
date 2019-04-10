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
  WPTMetricLighthousePerformance: number;
  scriptStepName: string;
  scriptStepNumber: string;
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
  | 'WPTMetricLighthousePerformance';

export interface MetricConstantForGraph { type: 'time' | 'number' | 'percent', colorDark: string, colorLight: string };

export interface ApiAuditResultType {
  audit: {
    uuid: string;
    page: string;
  };
  uuid: string,
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
  wpt_metric_lighthouse_performance: number;
  script_step_name: string;
  script_step_number: number;
}

export interface DataType {
  x: Date;
  y: number;
}
interface AuditResultsAsGraphDataPerMetric {
  scriptStepName?: string;
  metric: MetricType;
  auditResults: DataType[];
}

export type AuditResultsAsGraphData = AuditResultsAsGraphDataPerMetric[];
