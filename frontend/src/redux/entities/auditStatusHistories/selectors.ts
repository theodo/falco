import { RootState } from "redux/types";
import { AuditStatusHistoryType } from "./types";

export const getAuditStatusHistory = (state: RootState, auditStatusHistoryId: string): AuditStatusHistoryType | null | undefined => {
    return state.entities.auditStatusHistories.byId ? state.entities.auditStatusHistories.byId[auditStatusHistoryId] : undefined;
};
