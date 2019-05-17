import { MetricType } from 'redux/auditResults/types';
import { RootState } from 'redux/types';

export const getMetricsToDisplay = (state: RootState): MetricType[] => {
  return state.parameters.displayedMetrics;
};
