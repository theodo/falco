import { MetricType } from 'redux/auditResults/types';
import { getCurrentProjectId } from 'redux/selectors';
import { RootState, RootStateWithRouter } from 'redux/types';

export const getMetricsToDisplay = (state: RootState): MetricType[] => {
  const projectId = getCurrentProjectId(state as RootStateWithRouter);
  if (!state.parameters.displayedMetrics[projectId]) {
    return ['WPTMetricFirstViewTTI', 'WPTMetricFirstViewSpeedIndex', 'WPTMetricFirstViewLoadTime'];
  }
  return state.parameters.displayedMetrics[projectId];
};

export const getCurrentAuditParametersId = (state: RootState): string | null => {
  return state.parameters.currentAuditParametersId;
};
