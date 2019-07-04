import { MetricType } from 'redux/auditResults/types';
import { getProjectAuditParameters } from 'redux/entities/auditParameters/selectors';
import { AuditParametersType } from 'redux/entities/auditParameters/types';
import { getPage } from 'redux/entities/pages/selectors';
import { PageType } from 'redux/entities/pages/types';
import { getScript } from 'redux/entities/scripts/selectors';
import { ScriptType } from 'redux/entities/scripts/types';
import { getCurrentProject, getCurrentProjectId } from 'redux/selectors';
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

export const getCurrentAuditParameters = (state: RootState): AuditParametersType | null => {
  const currentAuditParametersId = getCurrentAuditParametersId(state);
  if (!currentAuditParametersId) {
    return null;
  }
  return state.entities.auditParameters.byId && state.entities.auditParameters.byId[currentAuditParametersId];
};

export const getCurrentPageId = (state: RootState): string | null => {
  return state.parameters.currentPageId;
};

export const getCurrentPage = (state: RootStateWithRouter): PageType | null => {
  const currentPageId = getCurrentPageId(state);
  if (!currentPageId) {
    return null;
  }
  return getPage(state, currentPageId);
};

export const getCurrentPageName = (state: RootStateWithRouter): string => {
  const currentPage = getCurrentPage(state);
  return currentPage ? currentPage.name : "";
};

export const getCurrentScriptId = (state: RootState): string | null => {
  return state.parameters.currentScriptId;
};

export const getCurrentScript = (state: RootStateWithRouter): ScriptType | null => {
  const currentScriptId = getCurrentScriptId(state);
  if (!currentScriptId) {
    return null;
  }
  return getScript(state, currentScriptId);
};

export const getCurrentScriptName = (state: RootStateWithRouter): string => {
  const currentScript = getCurrentScript(state);
  return currentScript ? currentScript.name : "";
};

export const getCurrentScriptStepId = (state: RootState): string | null => {
  return state.parameters.currentScriptStepId;
};

export const getCurrentProjectPages = (state: RootStateWithRouter): PageType[] => {
  const currentProject = getCurrentProject(state);
  if (!currentProject) {
    return [];
  };
  const pages = currentProject.pagesIds.map(pageId => getPage(state, pageId));
  return pages.filter((page): page is PageType => (page !== null));
};

export const getCurrentProjectScripts = (state: RootStateWithRouter): ScriptType[] => {
  const currentProject = getCurrentProject(state);
  if (!currentProject) {
    return [];
  };
  const scripts = currentProject.scriptsIds.map(scriptId => getScript(state, scriptId));
  return scripts.filter((script): script is ScriptType => (script !== null));
};

export const getCurrentProjectAuditParameters = (state: RootStateWithRouter): AuditParametersType[] => {
  const currentProject = getCurrentProject(state);
  if (!currentProject) {
    return [];
  };
  return getProjectAuditParameters(state, currentProject.uuid);
};
