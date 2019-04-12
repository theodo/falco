import { RootState } from 'redux/types';
import { AuditResultsAsGraphData, MetricType } from './types';

export const selectAuditResultsAsGraphData = (
  state: RootState,
  auditResultIds: string[],
  metrics: MetricType[],
): AuditResultsAsGraphData => {
  let auditResultsAsGraphDataPerMetric: AuditResultsAsGraphData = [];

  if (!auditResultIds || !metrics) {
    return auditResultsAsGraphDataPerMetric;
  }

  auditResultsAsGraphDataPerMetric = metrics.map((metric: MetricType) => ({
    metric,
    scriptStepName: state.auditResults.byAuditId[auditResultIds[0]].scriptStepName,
    auditResults: auditResultIds.map(auditResult => state.auditResults.byAuditId[auditResult] && {
      x: state.auditResults.byAuditId[auditResult].createdAt.toDate(),
      y: state.auditResults.byAuditId[auditResult][metric],
    }).filter(auditResult => !!auditResult)
  }));

  return auditResultsAsGraphDataPerMetric;
}
