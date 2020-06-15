import { createAction } from 'typesafe-actions';

export const signUpUserRequest = createAction('SignUp/USER_SIGN_UP_REQUEST')<{
  username: string;
  email: string;
  password: string;
  originLocation: string | undefined;
}>();

export const signUpUserSuccess = createAction('SignUp/USER_SIGN_UP_SUCCESS')();

export const signUpUserError = createAction('SignUp/USER_SIGN_UP_ERROR')<{
  errorMessage: string;
}>();

export const signUpUserClearError = createAction('SignUp/USER_CLEAR_SIGN_UP_ERROR')();

export default {
  signUpUserRequest,
  signUpUserSuccess,
  signUpUserError,
  signUpUserClearError,
};
