import { MetricType } from 'redux/auditResults/types';
import { modelizePages, modelizeScripts } from 'redux/projects/modelizer';
import { PageType, ScriptType } from 'redux/projects/types';
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

export const getCurrentPageId = (state: RootState): string | null => {
  return state.parameters.currentPageId;
};

export const getCurrentPage = (state: RootStateWithRouter): PageType | undefined => {
  const currentPageId = getCurrentPageId(state);
  return (
    state.projects.byId && state.projects.byId[getCurrentProjectId(state)] && currentPageId
    ? modelizePages(state.projects.byId[getCurrentProjectId(state)].pages)[currentPageId]
    : undefined
    )
}

export const getCurrentScriptId = (state: RootState): string | null => {
  return state.parameters.currentScriptId;
};

export const getCurrentScript = (state: RootStateWithRouter): ScriptType | undefined => {
  const currentScriptId = getCurrentScriptId(state);
  return (
    state.projects.byId && state.projects.byId[getCurrentProjectId(state)] && currentScriptId
    ? modelizeScripts(state.projects.byId[getCurrentProjectId(state)].scripts)[currentScriptId]
    : undefined
    )
}

export const getCurrentScriptStepId = (state: RootState): string | null => {
  return state.parameters.currentScriptStepId;
};
