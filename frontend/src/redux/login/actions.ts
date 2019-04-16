import { createStandardAction } from 'typesafe-actions';

export const loginUserRequest = createStandardAction('Login/USER_LOGIN_REQUEST')<{
  username: string;
  password: string;
}>();

export const loginUserSuccess = createStandardAction('Login/USER_LOGIN_SUCCESS')<{
  token: string;
}>();

export const loginUserError = createStandardAction('Login/USER_LOGIN_ERROR')<{
  errorMessage: string;
}>();

export const loginUserClearError = createStandardAction('Login/USER_CLEAR_LOGIN_ERROR')();

export default {
  loginUserRequest,
  loginUserSuccess,
  loginUserError,
  loginUserClearError,
};
