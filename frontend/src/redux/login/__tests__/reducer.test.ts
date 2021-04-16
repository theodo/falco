import { PersistState } from 'redux-persist/es/types';
import {
  loginUserClearError,
  loginUserError,
  loginUserRequest,
  loginUserSuccess,
  logoutUserRequest,
} from '../actions';
import reducer from '../reducer';

const username = 'MyUser';
const password = 'AwsomeP@sSw0rd';
const originLocation = undefined;
const initialState = {
  isAuthenticated: false,
  loginError: null,
  isSubmitting: false,
  _persist: {} as PersistState,
};
const stateDuringLogin = {
  isAuthenticated: false,
  loginError: null,
  isSubmitting: true,
  _persist: {} as PersistState,
};
const stateAfterLogin = {
  isAuthenticated: true,
  loginError: null,
  isSubmitting: false,
  _persist: {} as PersistState,
};
const stateAfterLoginError = {
  isAuthenticated: false,
  loginError: 'OUPS',
  isSubmitting: false,
  _persist: {} as PersistState,
};

describe('Login reducer', () => {
  describe('USER_LOGIN_REQUEST case', () => {
    it('Should return an initial state with isSubmitting field set to true and isAuthenticated field set to false', () => {
      const action = loginUserRequest({
        username,
        password,
        originLocation,
      });
      const expectedState = { ...initialState, isSubmitting: true, isAuthenticated: false };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('USER_LOGIN_SUCCESS case', () => {
    it('Should return an initial state with isAuthenticated field set to true and isSubmitting field set to false', () => {
      const action = loginUserSuccess();
      const expectedState = { ...stateDuringLogin, isAuthenticated: true, isSubmitting: false };

      expect(reducer(stateDuringLogin, action)).toEqual(expectedState);
    });
  });

  describe('USER_LOGIN_ERROR case', () => {
    it('Should return an initial state with an error in the loginError field and isSubmitting field set to false and isAuthenticated field set to false', () => {
      const errorMessage = 'User not logged in';
      const action = loginUserError({ errorMessage });
      const expectedState = {
        ...stateDuringLogin,
        loginError: errorMessage,
        isSubmitting: false,
        isAuthenticated: false,
      };

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

  describe('USER_LOGOUT_REQUEST case', () => {
    it('Should return the initial state', () => {
      const action = logoutUserRequest({});
      const expectedState = { ...initialState };

      expect(reducer(stateAfterLogin, action)).toEqual(expectedState);
    });
  });
});
