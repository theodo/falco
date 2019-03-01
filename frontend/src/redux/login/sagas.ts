import { push } from 'connected-react-router';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import { login } from 'services/networking/request';

import { loginUserError, loginUserRequest, loginUserSuccess } from './actions';

export function* loginUser(action: ActionType<typeof loginUserRequest>) {
  const endpoint = `/auth/jwt/create`;
  try {
    const token: string | undefined = yield call(login, endpoint, action.payload);
    if (token) {
      yield put(loginUserSuccess({ token }));
      yield put(push('/projects'));
    } else {
      yield put(loginUserError({ errorMessage: 'No token in login response body' }));
    }
  } catch (error) {
    yield put(loginUserError({ errorMessage: error.message }));
  }
}

export default function* loginUserSaga() {
  yield takeEvery(getType(loginUserRequest), loginUser);
}
