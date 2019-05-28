import { createStandardAction } from 'typesafe-actions';

import { MetricType } from 'redux/auditResults/types';

export const setCurrentAuditParametersId = createStandardAction(
  'parameters/SET_CURRENT_AUDIT_PARAMETERS_ID',
)<{
  auditParametersId: string | null | undefined;
}>();

export const setCurrentPageId = createStandardAction('parameters/SET_CURRENT_PAGE_ID')<{
  pageId: string | null | undefined;
}>();

export const setCurrentScriptId = createStandardAction('parameters/SET_CURRENT_SCRIPT_ID')<{
  scriptId: string | null | undefined;
}>();

export const setCurrentScriptStepId = createStandardAction(
  'parameters/SET_CURRENT_SCRIPT_STEP_ID',
)<{
  scriptStepId: string | null | undefined;
}>();

export const updateDisplayedMetrics = createStandardAction('parameters/UPDATE_DISPLAYED_METRICS')<{
  projectId: string;
  displayedMetrics: MetricType[];
}>();

export default {
  setCurrentAuditParametersId,
  setCurrentPageId,
  setCurrentScriptId,
  setCurrentScriptStepId,
  updateDisplayedMetrics,
};
