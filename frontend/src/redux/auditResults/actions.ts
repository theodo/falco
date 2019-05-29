import { createStandardAction } from 'typesafe-actions';

import { AuditResultType } from './types';

interface AuditTypeAndId {
  auditParametersId: string;
  pageOrScriptId: string;
  type: 'page' | 'script';
}

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
};
