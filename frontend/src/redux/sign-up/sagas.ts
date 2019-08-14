import { push } from 'connected-react-router';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { pause } from 'services/utils';
import { ActionType, getType } from 'typesafe-actions';

import { routeDefinitions } from 'routes';
import { makePostRequest } from 'services/networking/request';

import {
  signUpUserClearError,
  signUpUserError,
  signUpUserRequest,
  signUpUserSuccess,
} from './actions';

export function* signUpUser(action: ActionType<typeof signUpUserRequest>) {
  const endpoint = `/auth/users/`;
  try {
    yield put(signUpUserClearError());
    // pause function is called to let enough time to animation on button to be seen
    yield all([
      call(makePostRequest, endpoint, false, action.payload),
      call(pause, 1000),
    ]);
    yield put(signUpUserSuccess());
    const urlToRedirect = action.payload.originLocation
      ? action.payload.originLocation
      : routeDefinitions.projectsList.path;
    yield put(push(urlToRedirect));
  } catch (error) {
    yield put(signUpUserError({ errorMessage: error.message }));
  }
}

export default function* signUpUserSaga() {
  yield takeEvery(getType(signUpUserRequest), signUpUser);
}
