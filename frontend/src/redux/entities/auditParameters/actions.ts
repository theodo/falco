import { createAsyncAction } from "typesafe-actions";
import { AuditParametersType } from "./types";

export const fetchAuditParametersAction = createAsyncAction(
    'Entities/AuditParameters/FETCH_AUDITPARAMETERS_REQUEST',
    'Entities/AuditParameters/FETCH_AUDITPARAMETERS_SUCCESS',
    'Entities/AuditParameters/FETCH_AUDITPARAMETERS_FAILURE',
)<{}, { byId: Record<string, AuditParametersType>; }, { errorMessage: string }>();

export default {
    fetchAuditParametersAction,
}
