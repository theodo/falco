import { createAction } from 'typesafe-actions';

import { User } from './types';

export const fetchUserRequest = createAction('user/FETCH_USER_REQUEST')();
export const fetchUserSuccess = createAction('user/FETCH_USER_SUCCESS')<User>();
export const fetchUserError = createAction('user/FETCH_USER_ERROR')<{
  errorMessage: string;
}>();
