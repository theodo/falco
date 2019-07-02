import { MetricType } from 'redux/auditResults/types';
import { modelizePages, modelizeScripts } from 'redux/entities/projects/modelizer';
import { PageType, ScriptType } from 'redux/entities/projects/types';
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

export const getCurrentPage = (state: RootStateWithRouter): PageType | null => {
  const currentPageId = getCurrentPageId(state);
  const currentProjectId = getCurrentProjectId(state);
  return (
    state.projects.byId && state.projects.byId[currentProjectId] && currentPageId
      ? modelizePages(state.projects.byId[currentProjectId].pages)[currentPageId]
      : null
  )
}

export const getCurrentPageName = (state: RootStateWithRouter): string => {
  const currentPage = getCurrentPage(state);
  return currentPage ? currentPage.name : "";
}

export const getCurrentScriptId = (state: RootState): string | null => {
  return state.parameters.currentScriptId;
};

export const getCurrentScript = (state: RootStateWithRouter): ScriptType | null => {
  const currentScriptId = getCurrentScriptId(state);
  const currentProjectId = getCurrentProjectId(state);
  return (
    state.projects.byId && state.projects.byId[currentProjectId] && currentScriptId
      ? modelizeScripts(state.projects.byId[currentProjectId].scripts)[currentScriptId]
      : null
  )
}

export const getCurrentScriptName = (state: RootStateWithRouter): string => {
  const currentScript = getCurrentScript(state);
  return currentScript ? currentScript.name : "";
}

export const getCurrentScriptStepId = (state: RootState): string | null => {
  return state.parameters.currentScriptStepId;
};
