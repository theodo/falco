import { RootState } from "redux/types";
import { AuditParametersType } from "./types";

export const getAuditParameters = (state: RootState, auditParametersId: string): AuditParametersType | null => {
    return state.entities.auditParameters.byId && state.entities.auditParameters.byId[auditParametersId];
}
