import { all, call, put, takeEvery } from 'redux-saga/effects';
import { makeGetRequest, makePostRequest } from 'services/networking/request';
import { ActionType, getType } from 'typesafe-actions';

import { handleAPIExceptions } from 'services/networking/handleAPIExceptions';
import { fetchAuditParametersAction } from '../auditParameters/actions';
import { modelizeApiAuditParametersListToById } from '../auditParameters/modelizer';
import { ApiAuditParametersType } from '../auditParameters/types';
import { pollAuditStatusAction } from '../audits';
import { fetchAuditStatusHistoriesAction } from '../auditStatusHistories';
import { modelizeApiAuditStatusHistoriesToByPageOrScriptIdAndAuditParametersId } from '../auditStatusHistories/modelizer';
import { ApiAuditStatusHistoryType } from '../auditStatusHistories/types';
import { fetchPageAction } from '../pages';
import { modelizeApiPagesToById } from '../pages/modelizer';
import { ApiPageType } from '../pages/types';
import { fetchScriptAction } from '../scripts';
import { modelizeApiScriptsToById } from '../scripts/modelizer';
import { ApiScriptType } from '../scripts/types';
import {
  addMemberToProjectError,
  addMemberToProjectRequest,
  fetchProjectError,
  fetchProjectRequest,
  fetchProjectsRequest,
  fetchProjectSuccess,
  saveFetchedProjects,
} from './actions';
import { modelizeProjects } from './modelizer';
import { ApiProjectResponseType, ApiProjectType } from './types';

function* fetchProjectsFailedHandler(error: Error, actionPayload: Record<string, any>) {
  yield put(fetchProjectError({ projectId: actionPayload.currentProjectId, errorMessage: error.message }));
};

function* fetchProjectFailedHandler(error: Error, actionPayload: Record<string, any>) {
  yield put(fetchProjectError({ projectId: actionPayload.projectId, errorMessage: error.message }));
};

function* addMemberToProjectFailedHandler(error: Error, actionPayload: Record<string, any>) {
  yield put(addMemberToProjectError({ projectId: actionPayload.projectId, errorMessage: error.message }));
};

function* fetchProjects(action: ActionType<typeof fetchProjectsRequest>) {
  // this sagas will use a sort of lazy loading to start loading one project first, in order to speed
  // up the performance. If the user is on a specific project, then we start by loading this project.
  // on the contrary if the users requests all projects, then we load one at first with the /api/projects/first endpoint
  const firstProjectEndpoint = action.payload.currentProjectId
    ? `/api/projects/${action.payload.currentProjectId}/`
    : '/api/projects/first';
  const { body: firstProject }: { body: ApiProjectResponseType } = yield call(
    makeGetRequest,
    firstProjectEndpoint,
    true,
    null,
  );
  // if the returned project is empty, put an empty state for projects
  if (firstProject.project.uuid) {
    yield put(saveFetchedProjects({ projects: [firstProject.project] }));
  } else {
    yield put(fetchProjectError({ projectId: null, errorMessage: "No project returned" }));
    return;
  }
  // if the user has no other project, do not fetch them
  if (!firstProject.has_siblings) {
    return;
  };

  const endpoint = '/api/projects/';
  const { body: projects }: { body: ApiProjectType[] } = yield call(
    makeGetRequest,
    endpoint,
    true,
    null,
  );
  yield put(saveFetchedProjects({ projects }));
};

function* fetchProject(action: ActionType<typeof fetchProjectRequest>) {
  const endpoint = `/api/projects/${action.payload.projectId}/`;
  const { body: projectResponse }: { body: ApiProjectResponseType } = yield call(
    makeGetRequest,
    endpoint,
    true,
    null,
  );
  yield put(saveFetchedProjects({ projects: [projectResponse.project] }));
};

function* addMemberToProject(action: ActionType<typeof addMemberToProjectRequest>) {
  const endpoint = `/api/projects/${action.payload.projectId}/members`;
  const { body: projectResponse }: { body: ApiProjectResponseType } = yield call(
    makePostRequest,
    endpoint,
    true,
    { user_id: action.payload.userId },
  );
  yield put(saveFetchedProjects({ projects: [projectResponse.project] }));
};

function* saveProjectsToStore(action: ActionType<typeof saveFetchedProjects>) {
  const projects = action.payload.projects;
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

  const allApiAuditStatusHistories = projects.reduce((apiAuditStatusHistories: ApiAuditStatusHistoryType[], project: ApiProjectType) => {
    return apiAuditStatusHistories
      .concat(project.pages.reduce((pageStatusHistories: ApiAuditStatusHistoryType[], page: ApiPageType) => {
        return pageStatusHistories.concat(page.latest_audit_status_histories);
      }, []))
      .concat(project.scripts.reduce((scriptStatusHistories: ApiAuditStatusHistoryType[], script: ApiScriptType) => {
        return scriptStatusHistories.concat(script.latest_audit_status_histories);
      }, []));
  }, []);
  yield put(fetchAuditStatusHistoriesAction.success({
    byPageOrScriptIdAndAuditParametersId: modelizeApiAuditStatusHistoriesToByPageOrScriptIdAndAuditParametersId(allApiAuditStatusHistories),
  }));
  // launch polling for all non-success and non-error auditStatusHistories
  yield all(allApiAuditStatusHistories.map(
    apiAuditStatusHistory => (apiAuditStatusHistory.status === "PENDING" || apiAuditStatusHistory.status === "REQUESTED")
      ? put(pollAuditStatusAction({
        auditId: apiAuditStatusHistory.audit_id,
        pageOrScriptId: apiAuditStatusHistory.page_id || apiAuditStatusHistory.script_id,
      }))
      // the all() effect requires effect types for all its children, so we use this useless call effect
      : call(() => null)
  ));
  yield put(fetchProjectSuccess({ byId: modelizeProjects(projects) }));
};


export default function* projectsSaga() {
  yield takeEvery(
    getType(fetchProjectRequest),
    handleAPIExceptions(fetchProject, fetchProjectFailedHandler),
  );
  yield takeEvery(
    getType(addMemberToProjectRequest),
    handleAPIExceptions(addMemberToProject, addMemberToProjectFailedHandler),
  );
  yield takeEvery(
    getType(fetchProjectsRequest),
    handleAPIExceptions(fetchProjects, fetchProjectsFailedHandler),
  );
  yield takeEvery(
    getType(saveFetchedProjects),
    saveProjectsToStore,
  );
};
