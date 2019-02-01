import { createStandardAction } from 'typesafe-actions';
import { User } from './types';

export const updateUsername = createStandardAction('Avatar/UPDATE_USERNAME')<{
  username: string;
}>();
export const fetchUserRequest = createStandardAction('Avatar/USER_FETCH_REQUEST')<{
  username: string;
}>();
export const fetchUserSuccess = createStandardAction('Avatar/USER_FETCH_SUCCESS')<{
  user: User;
}>();
export const fetchUserError = createStandardAction('Avatar/USER_FETCH_ERROR')<{
  errorMessage: string;
}>();

export default {
  updateUsername,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserError,
};
