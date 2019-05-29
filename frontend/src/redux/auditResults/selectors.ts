import { RootState } from 'redux/types';
import { AuditResultsAsGraphData, AuditResultsAsGraphDataMetric, MetricType } from './types';

export const selectAuditResultsAsGraphData = (
  state: RootState,
  auditResultIds: string[],
  metrics: MetricType[],
): AuditResultsAsGraphData => {
  let auditResultsAsGraphDataPerMetric: AuditResultsAsGraphData = null;

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

export const selectAuditScriptSteps = (
  state: RootState,
  auditParametersId: string,
  scriptId: string,
): Record<string, string> => {
  if (
    state.auditResults.sortedByScriptId[scriptId] &&
    state.auditResults.sortedByScriptId[scriptId].byAuditParametersId &&
    state.auditResults.sortedByScriptId[scriptId].byAuditParametersId[auditParametersId]
  ) {
    const sortedAuditResults =
      state.auditResults.sortedByScriptId[scriptId].byAuditParametersId[auditParametersId];
    return Object.keys(sortedAuditResults).reduce((scriptStepNames, scriptStepKey) => {
      if (
        sortedAuditResults[scriptStepKey] &&
        sortedAuditResults[scriptStepKey][0] &&
        state.auditResults.byAuditId[sortedAuditResults[scriptStepKey][0]]
      ) {
        return {
          ...scriptStepNames,
          [scriptStepKey]:
            state.auditResults.byAuditId[sortedAuditResults[scriptStepKey][0]].scriptStepName,
        };
      }
      return scriptStepNames;
    }, {});
  }
  return {};
};

export const selectPageAuditResultsIds = (
  state: RootState,
  auditParametersId: string,
  pageId: string,
): string[] | null => {
  if (
    pageId in state.auditResults.sortedByPageId &&
    auditParametersId in state.auditResults.sortedByPageId[pageId].byAuditParametersId
  ) {
    return state.auditResults.sortedByPageId[pageId].byAuditParametersId[auditParametersId];
  }
  return null;
};

export const selectScriptAuditResultsIds = (
  state: RootState,
  auditParametersId: string,
  scriptId: string,
): Record<string, string[]> | null => {
  if (
    scriptId in state.auditResults.sortedByScriptId &&
    auditParametersId in state.auditResults.sortedByScriptId[scriptId].byAuditParametersId
  ) {
    return state.auditResults.sortedByScriptId[scriptId].byAuditParametersId[auditParametersId];
  }
  return null;
};
