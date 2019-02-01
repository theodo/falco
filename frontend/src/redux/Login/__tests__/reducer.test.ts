import { loginUserError, loginUserSuccess } from '../actions';
import reducer from '../reducer';

const token = 'OX1dSSVRFX1BPU1QsQ0FOX1JFQURfTkV';
const initialState = { token: null, loginError: null };

describe('Login reducer', () => {
  describe('USER_LOGIN_SUCCESS case', () => {
    it('Should return an initial state with a token in the token field', () => {
      const action = loginUserSuccess({
        token,
      });
      const expectedState = { ...initialState, token };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('USER_LOGIN_ERROR case', () => {
    it('Should return an initial state with an error in the loginError field', () => {
      const errorMessage = 'User not logged in';
      const action = loginUserError({ errorMessage });
      const expectedState = { ...initialState, loginError: errorMessage };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
