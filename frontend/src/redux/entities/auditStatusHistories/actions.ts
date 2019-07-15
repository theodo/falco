import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { ApiAuditStatusHistoryType, AuditStatusHistoryType } from "./types";

export const pollAuditStatusHistoriesAction = createStandardAction('auditStatusHistories/POLL_AUDIT_STATUS_HISTORY')<{
    auditId: string;
}>();

export const stopPollingAuditStatusHistoriesAction = createStandardAction('auditStatusHistories/STOP_POLLING_AUDIT_STATUS_HISTORY')<{
    lastAuditStatusHistory: ApiAuditStatusHistoryType;
}>();

export const fetchAuditStatusHistoriesAction = createAsyncAction(
    'auditStatusHistories/FETCH_AUDIT_STATUS_HISTORIES_REQUEST',
    'auditStatusHistories/FETCH_AUDIT_STATUS_HISTORIES_SUCCESS',
    'auditStatusHistories/FETCH_AUDIT_STATUS_HISTORIES_FAILURE',
)<
    { auditId: string; },
    {
        byPageOrScriptIdAndAuditParametersId: Readonly<Record<string, Record<string, AuditStatusHistoryType>>>;
    },
    { errorMessage: string }
>();

export default {
    fetchAuditStatusHistoriesAction,
    pollAuditStatusHistoriesAction,
    stopPollingAuditStatusHistoriesAction,
}
