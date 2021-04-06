import { MetricType } from 'redux/auditResults/types';
import { getProjectAuditParameters } from 'redux/entities/auditParameters/selectors';
import { AuditParametersType } from 'redux/entities/auditParameters/types';
import { getPageOrScriptRunningAuditId } from 'redux/entities/audits/selectors';
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

  return (
    state.entities.auditParameters.byId &&
    state.entities.auditParameters.byId[currentAuditParametersId]
  );
};

export const getCurrentPageId = (state: RootState): string | null => {
  return state.parameters.currentPageId;
};

export const getCurrentPage = (state: RootStateWithRouter): PageType | null | undefined => {
  const currentPageId = getCurrentPageId(state);
  if (!currentPageId) {
    return null;
  }

  return getPage(state, currentPageId);
};

export const getCurrentPageName = (state: RootStateWithRouter): string => {
  const currentPage = getCurrentPage(state);

  return currentPage ? currentPage.name : '';
};

export const getCurrentScriptId = (state: RootState): string | null => {
  return state.parameters.currentScriptId;
};

export const getCurrentScript = (state: RootStateWithRouter): ScriptType | null | undefined => {
  const currentScriptId = getCurrentScriptId(state);
  if (!currentScriptId) {
    return null;
  }

  return getScript(state, currentScriptId);
};

export const getCurrentScriptName = (state: RootStateWithRouter): string => {
  const currentScript = getCurrentScript(state);

  return currentScript ? currentScript.name : '';
};

export const getCurrentScriptStepId = (state: RootState): string | null => {
  return state.parameters.currentScriptStepId;
};

export const getCurrentProjectName = (state: RootStateWithRouter): string => {
  const currentProject = getCurrentProject(state);

  return currentProject ? currentProject.name : '';
};

export const getCurrentProjectAuditParameters = (
  state: RootStateWithRouter,
): AuditParametersType[] => {
  const currentProject = getCurrentProject(state);
  if (!currentProject) {
    return [];
  }

  return getProjectAuditParameters(state, currentProject.uuid) || [];
};

export const getCurrentAuditParametersName = (state: RootStateWithRouter): string => {
  const currentAuditParameters = getCurrentAuditParameters(state);

  return currentAuditParameters ? currentAuditParameters.name : '';
};

export const getCurrentProjectRunningAudits = (state: RootStateWithRouter): string[] => {
  const currentProject = getCurrentProject(state);
  if (!currentProject) {
    return [];
  }

  return currentProject.pagesIds
    .map((pageId) => getPageOrScriptRunningAuditId(state, pageId))
    .filter((auditId): auditId is string => auditId !== null && auditId !== undefined)
    .concat(
      currentProject.scriptsIds
        .map((scriptId) => getPageOrScriptRunningAuditId(state, scriptId))
        .filter((auditId): auditId is string => auditId !== null && auditId !== undefined),
    );
};
