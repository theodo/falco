import { createStandardAction } from 'typesafe-actions';

import { MetricType } from 'redux/auditResults/types';

export const setCurrentAuditParametersId = createStandardAction(
  'parameters/SET_CURRENT_AUDIT_PARAMETERS_ID',
)<{
  auditParametersId: string | null | undefined;
}>();

export const updateDisplayedMetrics = createStandardAction('parameters/UPDATE_DISPLAYED_METRICS')<{
  projectId: string;
  displayedMetrics: MetricType[];
}>();

export default {
  setCurrentAuditParametersId,
  updateDisplayedMetrics,
};
