import {
  signUpUserClearError,
  signUpUserError,
  signUpUserRequest,
  signUpUserSuccess,
} from '../actions';
import reducer from '../reducer';

const username = 'MyUser';
const email = 'fakemail@totallylegitprovider.com'
const password = 'AwsomeP@sSw0rd';
const originLocation = undefined;
const initialState = { signUpError: null, isSubmitting: false };
const stateDuringSignUp = { signUpError: null, isSubmitting: true  };
const stateAfterSignUp = { oginError: null, isSubmitting: false };
const stateAfterSignUpError = { signUpError: 'OUPS', isSubmitting: false };

describe('Login reducer', () => {
  describe('USER_SIGN_UP_REQUEST case', () => {
    it('Should return an initial state with isSubmitting field set to true', () => {
      const action = signUpUserRequest({
        username,
        email,
        password,
        originLocation,
      });
      const expectedState = { ...initialState, isSubmitting: true };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('USER_SIGN_UP_SUCCESS case', () => {
    it('Should return an initial state with isSubmitting field set to false', () => {
      const action = signUpUserSuccess();
      const expectedState = { ...stateDuringSignUp, isSubmitting: false };

      expect(reducer(stateDuringSignUp, action)).toEqual(expectedState);
    });
  });

  describe('USER_SIGN_UP_ERROR case', () => {
    it('Should return an initial state with an error in the signUpError field and isSubmitting field set to false', () => {
      const errorMessage = 'User not logged in';
      const action = signUpUserError({ errorMessage });
      const expectedState = { ...stateDuringSignUp, signUpError: errorMessage, isSubmitting: false };

      expect(reducer(stateDuringSignUp, action)).toEqual(expectedState);
    });
  });

  describe('USER_CLEAR_SIGN_UP_ERROR case', () => {
    it('Should return an initial state without any error in the signUpError field', () => {
      const action = signUpUserClearError();
      const expectedState = { ...initialState };

      expect(reducer(stateAfterSignUpError, action)).toEqual(expectedState);
    });
  });
});
