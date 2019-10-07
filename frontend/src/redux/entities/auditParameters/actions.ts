import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { AuditParametersType } from "./types";

export const fetchAuditParametersAction = createAsyncAction(
    'auditParameters/FETCH_AUDITPARAMETERS_REQUEST',
    'auditParameters/FETCH_AUDITPARAMETERS_SUCCESS',
    'auditParameters/FETCH_AUDITPARAMETERS_FAILURE',
)<{}, { byId: Record<string, AuditParametersType>; }, { errorMessage: string }>();

export const editAuditParameterRequest = createStandardAction('pages/EDIT_AUDIT_PARAMETER_REQUEST')<{
    projectId: string;
    auditParameter: {name: string, uuid: string};
  }>();
  export const editAuditParameterSuccess = createStandardAction('auditParameters/EDIT_AUDIT_PARAMETER_SUCCESS')<{
    auditParameter: AuditParametersType;
  }>();
  export const editAuditParameterError = createStandardAction('auditParameters/EDIT_AUDIT_PARAMETER_ERROR')<{
    projectId: string;
    auditParameter: AuditParametersType;
  }>();

export default {
    fetchAuditParametersAction,
    editAuditParameterRequest,
    editAuditParameterSuccess,
    editAuditParameterError,
}
