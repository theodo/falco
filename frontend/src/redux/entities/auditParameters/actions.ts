import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { AuditParametersType } from "./types";

export const fetchAuditParametersAction = createAsyncAction(
    'auditParameters/FETCH_AUDITPARAMETERS_REQUEST',
    'auditParameters/FETCH_AUDITPARAMETERS_SUCCESS',
    'auditParameters/FETCH_AUDITPARAMETERS_FAILURE',
)<{}, { byId: Record<string, AuditParametersType>; }, { errorMessage: string }>();

export default {
    fetchAuditParametersAction,
}
