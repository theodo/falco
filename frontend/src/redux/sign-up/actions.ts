import { createStandardAction } from 'typesafe-actions';

export const signUpUserRequest = createStandardAction('SignUp/USER_SIGN_UP_REQUEST')<{
  username: string;
  email: string;
  password: string;
  originLocation: string | undefined;
}>();

export const signUpUserSuccess = createStandardAction('SignUp/USER_SIGN_UP_SUCCESS')();

export const signUpUserError = createStandardAction('SignUp/USER_SIGN_UP_ERROR')<{
  errorMessage: string;
}>();

export const signUpUserClearError = createStandardAction('SignUp/USER_CLEAR_SIGN_UP_ERROR')();

export default {
  signUpUserRequest,
  signUpUserSuccess,
  signUpUserError,
  signUpUserClearError,
};
