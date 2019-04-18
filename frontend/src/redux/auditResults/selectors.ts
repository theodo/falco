import { RootState } from 'redux/types';
import { AuditResultsAsGraphData, AuditResultsAsGraphDataMetric, MetricType } from './types';

export const selectAuditResultsAsGraphData = (
  state: RootState,
  auditResultIds: string[],
  metrics: MetricType[],
): AuditResultsAsGraphData => {
  let auditResultsAsGraphDataPerMetric: AuditResultsAsGraphData = [];

  if (!auditResultIds || !metrics) {
    return auditResultsAsGraphDataPerMetric;
  }

  auditResultsAsGraphDataPerMetric = auditResultIds
    .map(
      auditResultId =>
        state.auditResults.byAuditId[auditResultId] && {
          date: state.auditResults.byAuditId[auditResultId].createdAt.toDate().getTime(),
          scriptStepName: state.auditResults.byAuditId[auditResultId].scriptStepName,
          ...metrics.reduce<AuditResultsAsGraphDataMetric>((metricsValues, metric) => {
            metricsValues[metric] = state.auditResults.byAuditId[auditResultId][metric];
            return metricsValues;
          }, {}),
        },
    )
    .filter(auditResultId => !!auditResultId)
    .sort((a, b) => a.date - b.date);

  return auditResultsAsGraphDataPerMetric;
};
