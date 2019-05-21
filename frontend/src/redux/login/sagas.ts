import { push } from 'connected-react-router';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { pause } from 'services/utils';
import { ActionType, getType } from 'typesafe-actions';

import { routeDefinitions } from 'routes';
import { login, logout } from 'services/networking/request';

import {
  loginUserClearError,
  loginUserError,
  loginUserRequest,
  loginUserSuccess,
  logoutUserRequest,
} from './actions';

export function* loginUser(action: ActionType<typeof loginUserRequest>) {
  const endpoint = `/auth/jwt/create`;
  try {
    yield put(loginUserClearError());
    // pause function is called to let enough time to animation on button to be seen
    const [isAuthenticated, unused] = yield all([
      call(login, endpoint, action.payload),
      call(pause, 1000),
    ]);
    if (isAuthenticated) {
      yield put(loginUserSuccess());
      const urlToRedirect = action.payload.originLocation
        ? action.payload.originLocation
        : routeDefinitions.projectsList.path;
      yield put(push(urlToRedirect));
    } else {
      yield put(loginUserError({ errorMessage: 'No token in login response body' }));
    }
  } catch (error) {
    yield put(loginUserError({ errorMessage: error.message }));
  }
}

export function* logoutUser(action: ActionType<typeof logoutUserRequest>) {
  const endpoint = `/auth/jwt/logout`;
  try {
    yield call(logout, endpoint);
    const urlToRedirect = action.payload.redirectTo
      ? action.payload.redirectTo
      : routeDefinitions.landing.path;
    yield put(push(urlToRedirect));
  } catch (error) {
    //
  }
}

export default function* loginUserSaga() {
  yield takeEvery(getType(loginUserRequest), loginUser);
  yield takeEvery(getType(logoutUserRequest), logoutUser);
}
