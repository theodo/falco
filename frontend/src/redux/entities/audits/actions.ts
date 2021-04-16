import { createAction, createAsyncAction } from 'typesafe-actions';
import { AuditStatusHistoryType } from '../auditStatusHistories/types';
import { AuditType } from './types';

export const pollAuditStatusAction = createAction('audits/POLL_AUDIT_STATUS')<{
  auditId: string;
  pageOrScriptId: string;
}>();

export const stopPollingAuditStatusAction = createAction('audits/STOP_POLLING_AUDIT_STATUS')<{
  lastAuditStatusHistory: AuditStatusHistoryType;
}>();

export const launchAuditAction = createAsyncAction(
  'audits/LAUNCH_AUDIT_REQUEST',
  'audits/LAUNCH_AUDIT_SUCCESS',
  'audits/LAUNCH_AUDIT_FAILURE',
)<{ projectId: string }, { audits: AuditType[] }, { errorMessage: string }>();

export default {
  launchAuditAction,
  pollAuditStatusAction,
  stopPollingAuditStatusAction,
};
