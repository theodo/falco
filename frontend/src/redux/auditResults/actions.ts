import { createAsyncAction, createStandardAction } from 'typesafe-actions';

import { AuditResultType, AuditType } from './types';

interface AuditTypeAndId {
  auditParametersId: string;
  pageOrScriptId: string;
  type: 'page' | 'script';
};

export const launchAudit = createAsyncAction(
  'auditResults/LAUNCH_AUDIT_REQUEST',
  'auditResults/LAUNCH_AUDIT_SUCCESS',
  'auditResults/LAUNCH_AUDIT_FAILURE',
)<
  { projectId: string; },
  { audits: AuditType[]; },
  { errorMessage: string; }
>();

export const fetchAuditResultsRequest = createStandardAction(
  'auditResults/FETCH_AUDIT_RESULTS_REQUEST',
)<AuditTypeAndId>();
export const fetchAuditResultsSuccess = createStandardAction(
  'auditResults/FETCH_AUDIT_RESULTS_SUCCESS',
)<{
  byAuditId: Record<string, AuditResultType>;
  auditParametersId: string;
  pageId?: string | undefined;
  scriptId?: string | undefined;
  sortedAuditResultsIds?: string[] | Record<string, string[]>;
}>();
export const fetchAuditResultsError = createStandardAction(
  'auditResults/FETCH_AUDIT_RESULTS_ERROR',
)<{
  errorMessage: string;
}>();

export default {
  fetchAuditResultsRequest,
  fetchAuditResultsSuccess,
  fetchAuditResultsError,
  launchAudit,
};
