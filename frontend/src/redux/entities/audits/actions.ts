import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { ApiAuditStatusHistoryType } from "../auditStatusHistories/types";
import { AuditType } from "./types";

export const pollAuditStatusAction = createStandardAction('audits/POLL_AUDIT_STATUS')<{
    auditId: string;
}>();

export const stopPollingAuditStatusAction = createStandardAction('audits/STOP_POLLING_AUDIT_STATUS')<{
    lastAuditStatusHistory: ApiAuditStatusHistoryType;
}>();

export const launchAuditAction = createAsyncAction(
    'audits/LAUNCH_AUDIT_REQUEST',
    'audits/LAUNCH_AUDIT_SUCCESS',
    'audits/LAUNCH_AUDIT_FAILURE',
)<
    { projectId: string; },
    { audits: AuditType[]; },
    { errorMessage: string; }
>();

export default {
    launchAuditAction,
    pollAuditStatusAction,
    stopPollingAuditStatusAction,
}
