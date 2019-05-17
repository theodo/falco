import { createStandardAction } from 'typesafe-actions';

import { MetricType } from 'redux/auditResults/types';

export const updateDisplayedMetrics = createStandardAction('parameters/UPDATE_DISPLAYED_METRICS')<{
  displayedMetrics: MetricType[];
}>();

export default {
  updateDisplayedMetrics,
};
