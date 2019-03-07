import * as colors from '@material-ui/core/colors';
import { MetricType } from './types';

// colors from https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=D32F2F
export const METRICS: Record<MetricType, { type: 'time' | 'number' | 'percent', colorDark: string, colorLight: string }> = {
  WPTMetricFirstViewTTI: { type: 'time', colorDark: colors.grey[800], colorLight: colors.grey[100] },
  WPTMetricRepeatViewTTI: { type: 'time', colorDark: colors.blueGrey[800], colorLight: colors.blueGrey[100] },
  WPTMetricFirstViewSpeedIndex: { type: 'number', colorDark: colors.purple[800], colorLight: colors.purple[100] },
  WPTMetricRepeatViewSpeedIndex: { type: 'number', colorDark: colors.deepPurple[800], colorLight: colors.deepPurple[100] },
  WPTMetricFirstViewFirstPaint: { type: 'time', colorDark: colors.indigo[800], colorLight: colors.indigo[100] },
  WPTMetricRepeatViewFirstPaint: { type: 'time', colorDark: colors.blue[800], colorLight: colors.blue[100] },
  WPTMetricFirstViewFirstMeaningfulPaint: { type: 'time', colorDark: colors.cyan[800], colorLight: colors.cyan[100] },
  WPTMetricRepeatViewFirstMeaningfulPaint: { type: 'time', colorDark: colors.teal[800], colorLight: colors.teal[100] },
  WPTMetricFirstViewLoadTime: { type: 'time', colorDark: colors.green[800], colorLight: colors.green[100] },
  WPTMetricRepeatViewLoadTime: { type: 'time', colorDark: colors.lightGreen[800], colorLight: colors.lightGreen[100] },
  WPTMetricFirstViewFirstContentfulPaint: { type: 'time', colorDark: colors.lime[800], colorLight: colors.lime[100] },
  WPTMetricRepeatViewFirstContentfulPaint: { type: 'time', colorDark: colors.yellow[800], colorLight: colors.yellow[100] },
  WPTMetricFirstViewTimeToFirstByte: { type: 'time', colorDark: colors.amber[800], colorLight: colors.amber[100] },
  WPTMetricRepeatViewTimeToFirstByte: { type: 'time', colorDark: colors.orange[800], colorLight: colors.orange[100] },
  WPTMetricLighthousePerformance: { type: 'percent', colorDark: colors.deepOrange[800], colorLight: colors.deepOrange[100] },
};
