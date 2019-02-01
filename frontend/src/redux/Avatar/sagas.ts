// @flow
import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import { makeGetRequest } from 'services/networking/request';
import { fetchUserError, fetchUserRequest, fetchUserSuccess } from './actions';

// worker Saga: will be fired on USER_FETCH_REQUEST actions
export function* fetchUser(action: ActionType<typeof fetchUserRequest>) {
  const endpoint = `/users/${action.payload.username}`;
  try {
    const response = yield call(makeGetRequest, endpoint);
    yield put(fetchUserSuccess({ user: response.body }));
  } catch (error) {
    yield put(fetchUserError({ errorMessage: error.message }));
  }
}

/*
  Behavior similar to redux-thunk
  Starts fetchUser on each dispatched `USER_FETCH_REQUEST` action.
  Allows concurrent fetches of user.
*/
export default function* fetchUserSaga() {
  yield takeEvery(getType(fetchUserRequest), fetchUser);
}
