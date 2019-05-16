import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import { makePostRequest } from 'services/networking/request';

import { createLeadError, createLeadRequest, createLeadSuccess } from './actions';

export function* createLead(action: ActionType<typeof createLeadRequest>) {
  const endpoint = `/api/leads/`;
  try {
    yield call(makePostRequest, endpoint, action.payload);
    yield put(createLeadSuccess({}));
  } catch (error) {
    yield put(createLeadError({ errorMessage: error.message }));
  }
}

export default function* leadSaga() {
  yield takeEvery(getType(createLeadRequest), createLead);
}
