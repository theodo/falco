import { MetricType } from './types';

export const METRICS: Record<MetricType, { type: 'time' | 'number' | 'percent' }> = {
  WPTMetricFirstViewTTI: { type: 'time' },
  WPTMetricRepeatViewTTI: { type: 'time' },
  WPTMetricFirstViewSpeedIndex: { type: 'number' },
  WPTMetricRepeatViewSpeedIndex: { type: 'number' },
  WPTMetricFirstViewFirstPaint: { type: 'time' },
  WPTMetricRepeatViewFirstPaint: { type: 'time' },
  WPTMetricFirstViewFirstMeaningfulPaint: { type: 'time' },
  WPTMetricRepeatViewFirstMeaningfulPaint: { type: 'time' },
  WPTMetricFirstViewLoadTime: { type: 'time' },
  WPTMetricRepeatViewLoadTime: { type: 'time' },
  WPTMetricFirstViewFirstContentfulPaint: { type: 'time' },
  WPTMetricRepeatViewFirstContentfulPaint: { type: 'time' },
  WPTMetricFirstViewTimeToFirstByte: { type: 'time' },
  WPTMetricRepeatViewTimeToFirstByte: { type: 'time' },
  WPTMetricLighthousePerformance: { type: 'percent' },
};
