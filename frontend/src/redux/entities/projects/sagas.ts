import { call, put, takeEvery } from 'redux-saga/effects';
import { makeGetRequest } from 'services/networking/request';
import { ActionType, getType } from 'typesafe-actions';

import { handleAPIExceptions } from 'services/networking/handleAPIExceptions';

import { fetchAuditParametersAction } from '../auditParameters/actions';
import { modelizeApiAuditParametersListToById } from '../auditParameters/modelizer';
import { ApiAuditParametersType } from '../auditParameters/types';
import { fetchAuditStatusHistoriesAction } from '../auditStatusHistories';
import { modelizeApiAuditStatusHistoriesToById } from '../auditStatusHistories/modelizer';
import { ApiAuditStatusHistoryType } from '../auditStatusHistories/types';
import { fetchPageAction } from '../pages';
import { modelizeApiPagesToById } from '../pages/modelizer';
import { ApiPageType } from '../pages/types';
import { fetchScriptAction } from '../scripts';
import { modelizeApiScriptsToById } from '../scripts/modelizer';
import { ApiScriptType } from '../scripts/types';
import {
  fetchProjectError,
  fetchProjectRequest,
  fetchProjectsRequest,
  fetchProjectSuccess,
} from './actions';
import { modelizeProject, modelizeProjects } from './modelizer';
import { ApiProjectType } from './types';

function* fetchProjectsFailedHandler(error: Error) {
  yield put(fetchProjectError({ projectId: null, errorMessage: error.message }));
}

function* fetchProjectFailedHandler(error: Error, actionPayload: Record<string, any>) {
  yield put(fetchProjectError({ projectId: actionPayload.projectId, errorMessage: error.message }));
}

export function* fetchProjects() {
  const endpoint = '/api/projects/';
  const { body: projects }: { body: ApiProjectType[] } = yield call(
    makeGetRequest,
    endpoint,
    true,
    null,
  );
  yield put(fetchPageAction.success({
    byId: modelizeApiPagesToById(projects.reduce((apiPages: ApiPageType[], project: ApiProjectType) => {
      return apiPages.concat(project.pages);
    }, [])),
  }));
  yield put(fetchScriptAction.success({
    byId: modelizeApiScriptsToById(projects.reduce((apiScripts: ApiScriptType[], project: ApiProjectType) => {
      return apiScripts.concat(project.scripts);
    }, [])),
  }));
  yield put(fetchAuditParametersAction.success({
    byId: modelizeApiAuditParametersListToById(projects.reduce((apiAuditParametersList: ApiAuditParametersType[], project: ApiProjectType) => {
      return apiAuditParametersList.concat(project.audit_parameters_list);
    }, [])),
  }));
  yield put(fetchAuditStatusHistoriesAction.success({
    byId: modelizeApiAuditStatusHistoriesToById(projects.reduce((apiAuditStatusHistories: ApiAuditStatusHistoryType[], project: ApiProjectType) => {
      return apiAuditStatusHistories
        .concat(project.pages.reduce((pageStatusHistories: ApiAuditStatusHistoryType[], page: ApiPageType) => {
          return pageStatusHistories.concat(page.latest_audit_status_histories);
        }, []))
        .concat(project.scripts.reduce((scriptStatusHistories: ApiAuditStatusHistoryType[], script: ApiScriptType) => {
          return scriptStatusHistories.concat(script.latest_audit_status_histories);
        }, []));
    }, [])),
  }));
  yield put(fetchProjectSuccess({ byId: modelizeProjects(projects) }));
};

export function* fetchProject(action: ActionType<typeof fetchProjectRequest>) {
  const endpoint = `/api/projects/${action.payload.projectId}/`;
  const { body: project }: { body: ApiProjectType } = yield call(
    makeGetRequest,
    endpoint,
    true,
    null,
  );
  yield put(fetchProjectSuccess({ byId: modelizeProject(project) }));
}

export default function* projectsSaga() {
  yield takeEvery(
    getType(fetchProjectRequest),
    handleAPIExceptions(fetchProject, fetchProjectFailedHandler),
  );
  yield takeEvery(
    getType(fetchProjectsRequest),
    handleAPIExceptions(fetchProjects, fetchProjectsFailedHandler),
  );
};
