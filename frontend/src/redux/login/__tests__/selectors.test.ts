import { state } from '__fixtures__/state';
import { PersistState } from 'redux-persist/es/types';
import { getIsAuthenticated, getIsSubmitting, getLoginError } from '../selectors';

const isAuthenticated = true;
const loginError = 'User not logged in';
const isSubmitting = false;

const initialState = {
  ...state,
  login: { isAuthenticated, loginError, isSubmitting, _persist: {} as PersistState },
};

describe('Login selectors', () => {
  describe('getLoginError function', () => {
    it('Should return the value stored in store.login.loginError', () => {
      expect(getLoginError(initialState)).toBe(loginError);
    });
  });
  describe('getIsSubmitting function', () => {
    it('Should return the value stored in store.login.isSubmitting', () => {
      expect(getIsSubmitting(initialState)).toBe(isSubmitting);
    });
  });
  describe('getIsAuthenticated function', () => {
    it('Should return the value stored in store.login.isAuthenticated', () => {
      expect(getIsAuthenticated(initialState)).toBe(isAuthenticated);
    });
  });
});
