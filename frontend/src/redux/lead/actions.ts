import { createStandardAction } from 'typesafe-actions';

export const createLeadRequest = createStandardAction('Lead/CREATE_LEAD_REQUEST')<{
  email: string;
}>();

export const createLeadSuccess = createStandardAction('Lead/CREATE_LEAD_SUCCESS')<{}>();

export const createLeadError = createStandardAction('Lead/CREATE_LEAD_ERROR')<{
  errorMessage: string;
}>();

export default {
  createLeadRequest,
  createLeadSuccess,
  createLeadError,
};
