import { call, put, takeEvery } from 'redux-saga/effects';
import { makeGetRequest } from 'services/networking/request';
import { ActionType, getType } from 'typesafe-actions';
import {
  fetchProjectError,
  fetchProjectRequest,
  fetchProjectSuccess,
  fetchProjectsRequest,
} from './actions';
import { fetchPagesSuccess } from 'redux/pages';
import { modelizePages } from 'redux/pages/modelizer';
import { ApiProjectType } from './types';
import { modelizeProject, modelizeProjects } from './modelizer';
import { handleAPIExceptions } from 'services/networking/handleAPIExceptions';

function* fetchProjectFailedHandler(error: Error) {
  yield put(fetchProjectError({ errorMessage: error.message }));
}

export function* fetchProjects(action: ActionType<typeof fetchProjectsRequest>) {
  const endpoint = '/projects/';
  const { body: projects }: { body: ApiProjectType[] } = yield call(makeGetRequest, endpoint);
  yield put(fetchProjectSuccess({ byId: modelizeProjects(projects) }));
}

export function* fetchProject(action: ActionType<typeof fetchProjectRequest>) {
  const endpoint = `/projects/${action.payload.projectId}/`;
  const { body: project }: { body: ApiProjectType } = yield call(makeGetRequest, endpoint);
  yield put(fetchProjectSuccess({ byId: modelizeProject(project) }));
  yield put(fetchPagesSuccess({ byId: modelizePages(project.pages) }));
}

export default function* projectsSaga() {
  yield takeEvery(
    getType(fetchProjectRequest),
    handleAPIExceptions(fetchProject, fetchProjectFailedHandler),
  );
  yield takeEvery(
    getType(fetchProjectsRequest),
    handleAPIExceptions(fetchProjects, fetchProjectFailedHandler),
  );
}
