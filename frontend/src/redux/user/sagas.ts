import { call, put, select, takeEvery } from 'redux-saga/effects';
import { makeGetRequest } from 'services/networking/request';
import { getType } from 'typesafe-actions';

import { getUserToken } from 'redux/login/selectors';
import { handleAPIExceptions } from 'services/networking/handleAPIExceptions';

import { fetchUserError, fetchUserRequest, fetchUserSuccess } from './actions';
import { modelizeUser } from './modelizer';
import { ApiUser } from './types';

function* fetchUserFailedHandler(error: Error) {
  yield put(fetchUserError({ errorMessage: error.message }));
}

export function* fetchUser() {
  const endpoint = '/api/core/user';
  const token = yield select(getUserToken);
  const { body: user }: { body: ApiUser } = yield call(
    makeGetRequest,
    endpoint,
    null,
    token,
  );
  yield put(fetchUserSuccess(modelizeUser(user)));
}

export default function* userSaga() {
  yield takeEvery(
    getType(fetchUserRequest),
    handleAPIExceptions(fetchUser, fetchUserFailedHandler),
  );
}
