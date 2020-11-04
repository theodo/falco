import { createAction } from 'typesafe-actions';

export const loginUserRequest = createAction('Login/USER_LOGIN_REQUEST')<{
  username: string;
  password: string;
  originLocation: string | undefined;
}>();

export const loginUserSuccess = createAction('Login/USER_LOGIN_SUCCESS')();

export const loginUserError = createAction('Login/USER_LOGIN_ERROR')<{
  errorMessage: string;
}>();

export const loginUserClearError = createAction('Login/USER_CLEAR_LOGIN_ERROR')();

export const logoutUserRequest = createAction('Logout/USER_LOGOUT_REQUEST')<{
  redirectTo?: string | undefined;
}>();

export default {
  loginUserRequest,
  loginUserSuccess,
  loginUserError,
  loginUserClearError,
  logoutUserRequest,
};
