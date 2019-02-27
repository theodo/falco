import { call, put, takeEvery } from 'redux-saga/effects';
import { makeGetRequest } from 'services/networking/request';
import { ActionType, getType } from 'typesafe-actions';
import { fetchProjectRequest, fetchProjectSuccess, fetchProjectError } from './actions';
import { fetchPagesSuccess } from 'redux/pages';
import { modelizePages } from 'redux/pages/modelizer';
import { ApiProjectType } from './types';
import { modelizeProject } from './modelizer';

export function* fetchProject(action: ActionType<typeof fetchProjectRequest>) {
  const endpoint = `/projects/${action.payload.projectId}/`;
  try {
    const { body: project }: { body: ApiProjectType } = yield call(makeGetRequest, endpoint);
    yield put(fetchProjectSuccess({ byId: modelizeProject(project) }));
    yield put(fetchPagesSuccess({ byId: modelizePages(project.pages) }));
  } catch (error) {
    yield put(fetchProjectError({ errorMessage: error.message }));
  }
}

export default function* projectsSaga() {
  yield takeEvery(getType(fetchProjectRequest), fetchProject);
}
