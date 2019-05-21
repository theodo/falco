import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { getType } from 'typesafe-actions';

import { login } from 'services/networking/request';

import { loginUserError, loginUserRequest, loginUserSuccess } from '../actions';
import { loginUser } from '../sagas';

const loginUserRequestAction = loginUserRequest({
  username: 'bilbo@culdesac.gnd',
  password: 'm0ñPr3cieuX',
  originLocation: undefined,
});

describe('[Saga] Login redux', () => {
  describe('loginUser', () => {
    describe('when request is a success', () => {
      it('should call the success action when request is a success', async () => {
        return expectSaga(loginUser, loginUserRequestAction)
          .provide([[matchers.call.fn(login), true]])
          .put(loginUserSuccess())
          .run(1250);
      });
    });

    describe('when request fails', () => {
      it('should call the error action', async () => {
        const error = new Error();
        return expectSaga(loginUser, loginUserRequestAction)
          .provide([[matchers.call.fn(login), throwError(error)]])
          .put(loginUserError({ errorMessage: error.message }))
          .not.put.actionType(getType(loginUserSuccess))
          .run(1250);
      });
    });
  });
});
