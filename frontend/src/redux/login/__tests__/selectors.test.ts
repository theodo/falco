import { state } from '__fixtures__/state';
import { getIsSubmitting, getLoginError, getUserToken } from '../selectors';

const token = 'OX1dSSVRFX1BPU1QsQ0FOX1JFQURfTkV';
const loginError = 'User not logged in';
const isSubmitting = false;

const initialState = { ...state, login: { token, loginError, isSubmitting } };

describe('Login selectors', () => {
  describe('getUserToken function', () => {
    it('Should return the value stored in store.login.token', () => {
      expect(getUserToken(initialState)).toBe(token);
    });
  });
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
});
