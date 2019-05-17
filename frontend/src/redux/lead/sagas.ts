import { all, call, put, takeEvery } from 'redux-saga/effects';
import { pause } from 'services/utils';
import { ActionType, getType } from 'typesafe-actions';

import { makePostRequest } from 'services/networking/request';

import { createLeadError, createLeadRequest, createLeadSuccess } from './actions';

export function* createLead(action: ActionType<typeof createLeadRequest>) {
  const endpoint = `/api/leads/`;
  try {
    // pause function is called to let enough time to animation on button to be seen
    yield all([call(makePostRequest, endpoint, action.payload), call(pause, 1000)]);
    yield put(createLeadSuccess({}));
  } catch (error) {
    yield put(createLeadError({ errorMessage: error.message }));
  }
}

export default function* leadSaga() {
  yield takeEvery(getType(createLeadRequest), createLead);
}
