// @flow
import { call, put, takeEvery } from 'redux-saga/effects';
import { makeGetRequest } from 'services/networking/request';
import { ActionType, getType } from 'typesafe-actions';
import { fetchProjectRequest, fetchProjectSuccess, fetchProjectError } from './actions';

export function* fetchProject(action: ActionType<typeof fetchProjectRequest>) {
  const endpoint = `/projects/${action.payload.projectId}/`;
  try {
    const project = yield call(makeGetRequest, endpoint);
    yield put(fetchProjectSuccess(project));
  } catch (error) {
    yield put(fetchProjectError({ errorMessage: error.message }));
  }
}

export default function* projectsSaga() {
  yield takeEvery(getType(fetchProjectRequest), fetchProject);
}
