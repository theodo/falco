import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { getType } from 'typesafe-actions';

import { makePostRequest } from 'services/networking/request';

import { loginUserRequest } from 'redux/login';
import { signUpUserError, signUpUserRequest, signUpUserSuccess } from '../actions';
import { signUpUser } from '../sagas';

const payload = {
  username: 'Bilbo',
  password: 'm0ñPr3cieuX',
  email: 'bilbo@culdesac.gnd',
  originLocation: undefined,
};

const signUpUserRequestAction = signUpUserRequest(payload);

describe('[Saga] Sign Up redux', () => {
  describe('signUpUser', () => {
    describe('when request is a success', () => {
      it('should call the success action when request is a success and log in the user', async () => {
        return expectSaga(signUpUser, signUpUserRequestAction)
          .provide([[matchers.call.fn(makePostRequest), true]])
          .put(signUpUserSuccess())
          .put(loginUserRequest(payload))
          .run(1250);
      });
    });

    describe('when request fails', () => {
      it('should call the error action', async () => {
        const error = new Error();

        return expectSaga(signUpUser, signUpUserRequestAction)
          .provide([[matchers.call.fn(makePostRequest), throwError(error)]])
          .put(signUpUserError({ errorMessage: error.message }))
          .not.put.actionType(getType(signUpUserSuccess))
          .run(1250);
      });
    });
  });
});
