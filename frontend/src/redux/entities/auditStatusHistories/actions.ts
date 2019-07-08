import { createAsyncAction } from "typesafe-actions";
import { AuditStatusHistoryType } from "./types";

export const fetchAuditStatusHistoriesAction = createAsyncAction(
    'Entities/AuditStatusHistories/FETCH_AUDITSTATUSHISTORIES_REQUEST',
    'Entities/AuditStatusHistories/FETCH_AUDITSTATUSHISTORIES_SUCCESS',
    'Entities/AuditStatusHistories/FETCH_AUDITSTATUSHISTORIES_FAILURE',
)<
    {},
    {
        byId: Record<string, AuditStatusHistoryType>;
        byPageOrScriptIdAndAuditParametersId: Readonly<Record<string, string>>;
    },
    { errorMessage: string }
>();

export default {
    fetchAuditStatusHistoriesAction,
}
