import { createStandardAction } from 'typesafe-actions';

import { User } from './types';

export const fetchUserRequest = createStandardAction('user/FETCH_USER_REQUEST')<{}>();
export const fetchUserSuccess = createStandardAction('user/FETCH_USER_SUCCESS')<User>();
export const fetchUserError = createStandardAction('user/FETCH_USER_ERROR')<{
  errorMessage: string;
}>();

export default {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserError,
};
