import { state } from '__fixtures__/state';
import { getIsSubmitting, getSignUpError } from '../selectors';

const signUpError = 'User not logged in';
const isSubmitting = false;

const initialState = {
  ...state,
  signUp: { signUpError, isSubmitting },
};

describe('Sign Up selectors', () => {
  describe('getSignUpError function', () => {
    it('Should return the value stored in store.signUp.signUpError', () => {
      expect(getSignUpError(initialState)).toBe(signUpError);
    });
  });
  describe('getIsSubmitting function', () => {
    it('Should return the value stored in store.signUp.isSubmitting', () => {
      expect(getIsSubmitting(initialState)).toBe(isSubmitting);
    });
  });
});
