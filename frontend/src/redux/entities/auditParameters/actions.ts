import { createAsyncAction, createAction } from 'typesafe-actions';
import { AuditParametersType } from './types';

export const fetchAuditParametersAction = createAsyncAction(
  'auditParameters/FETCH_AUDITPARAMETERS_REQUEST',
  'auditParameters/FETCH_AUDITPARAMETERS_SUCCESS',
  'auditParameters/FETCH_AUDITPARAMETERS_FAILURE',
)<{}, { byId: Record<string, AuditParametersType> }, { errorMessage: string }>();

export const editAuditParameterRequest = createAction(
  'auditParameters/EDIT_AUDIT_PARAMETER_REQUEST',
)<{
  projectId: string;
  auditParameter: { name: string; uuid: string; configuration_id: string; network_shape: string };
}>();
export const editAuditParameterSuccess = createAction(
  'auditParameters/EDIT_AUDIT_PARAMETER_SUCCESS',
)<{
  byId: Record<string, AuditParametersType>;
}>();
export const editAuditParameterError = createAction('auditParameters/EDIT_AUDIT_PARAMETER_ERROR')<{
  projectId: string;
  errorMessage: string;
}>();

export default {
  fetchAuditParametersAction,
  editAuditParameterRequest,
  editAuditParameterSuccess,
  editAuditParameterError,
};
