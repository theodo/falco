// @flow
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call, takeEvery } from 'redux-saga/effects';
import { makeGetRequest } from 'services/networking/request';
import { getType } from 'typesafe-actions';

import { fetchUserError, fetchUserRequest, fetchUserSuccess } from '../actions';
import fetchUserSaga, { fetchUser } from '../sagas';

const fetchUserRequestAction = fetchUserRequest({ username: 'tcheymol' });

const endpoint = '/users/tcheymol';
const githubUser = { avatar_url: 'https://google.com' };
const outputMock = { body: githubUser };

describe('[Saga] Avatar redux', () => {
  describe('fetchUser', () => {
    describe('when request is a success', () => {
      it('should call the success action when request is a success', async () => {
        return expectSaga(fetchUser, fetchUserRequestAction)
          .provide([[call(makeGetRequest, endpoint), outputMock]])
          .put(fetchUserSuccess({ user: githubUser }))
          .run();
      });
    });

    describe('when request fails', () => {
      it('should call the error action', async () => {
        const error = new Error();
        return expectSaga(fetchUser, fetchUserRequestAction)
          .provide([[call(makeGetRequest, endpoint), throwError(error)]])
          .put(fetchUserError({ errorMessage: error.message }))
          .not.put.actionType(getType(fetchUserSuccess))
          .run();
      });
    });
  });
});
