import { createAsyncAction } from "typesafe-actions";
import { AuditStatusHistoryType } from "./types";

export const fetchAuditStatusHistoriesAction = createAsyncAction(
    'auditStatusHistories/FETCH_AUDIT_STATUS_HISTORIES_REQUEST',
    'auditStatusHistories/FETCH_AUDIT_STATUS_HISTORIES_SUCCESS',
    'auditStatusHistories/FETCH_AUDIT_STATUS_HISTORIES_FAILURE',
)<
    { auditId: string; },
    {
        byId: Record<string, AuditStatusHistoryType>;
        byPageOrScriptIdAndAuditParametersId: Readonly<Record<string, string>>;
    },
    { errorMessage: string }
>();

export default {
    fetchAuditStatusHistoriesAction,
}
