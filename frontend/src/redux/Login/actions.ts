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

export default {
  loginUserRequest,
  loginUserSuccess,
  loginUserError,
};
