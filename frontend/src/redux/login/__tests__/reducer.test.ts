import {
  loginUserClearError,
  loginUserError,
  loginUserRequest,
  loginUserSuccess,
} from '../actions';
import reducer from '../reducer';

const token = 'OX1dSSVRFX1BPU1QsQ0FOX1JFQURfTkV';
const username = 'MyUser';
const password = 'AwsomeP@sSw0rd';
const initialState = { token: null, loginError: null, isSubmitting: false };
const stateDuringLogin = { token: null, loginError: null, isSubmitting: true };
const stateAfterLoginError = { token: null, loginError: 'OUPS', isSubmitting: false };

describe('Login reducer', () => {
  describe('USER_LOGIN_REQUEST case', () => {
    it('Should return an initial state with isSubmitting field set to true', () => {
      const action = loginUserRequest({
        username,
        password,
      });
      const expectedState = { ...initialState, isSubmitting: true };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('USER_LOGIN_SUCCESS case', () => {
    it('Should return an initial state with a token in the token field and isSubmitting field set to false', () => {
      const action = loginUserSuccess({
        token,
      });
      const expectedState = { ...stateDuringLogin, token, isSubmitting: false };

      expect(reducer(stateDuringLogin, action)).toEqual(expectedState);
    });
  });

  describe('USER_LOGIN_ERROR case', () => {
    it('Should return an initial state with an error in the loginError field and isSubmitting field set to false', () => {
      const errorMessage = 'User not logged in';
      const action = loginUserError({ errorMessage });
      const expectedState = { ...stateDuringLogin, loginError: errorMessage, isSubmitting: false };

      expect(reducer(stateDuringLogin, action)).toEqual(expectedState);
    });
  });

  describe('USER_CLEAR_LOGIN_ERROR case', () => {
    it('Should return an initial state without any error in the loginError field', () => {
      const action = loginUserClearError();
      const expectedState = { ...initialState };

      expect(reducer(stateAfterLoginError, action)).toEqual(expectedState);
    });
  });
});
