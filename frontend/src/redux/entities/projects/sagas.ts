import { all, call, put, takeEvery } from 'redux-saga/effects';
import { handleAPIExceptions } from 'services/networking/handleAPIExceptions';
import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from 'services/networking/request';
import { ActionType, getType } from 'typesafe-actions';

import { fetchAuditParametersAction } from '../auditParameters/actions';
import {
  modelizeApiAuditParametersListToById,
  modelizeAuditParameters,
} from '../auditParameters/modelizer';
import { ApiAuditParametersType } from '../auditParameters/types';
import { pollAuditStatusAction } from '../audits';
import { fetchAuditStatusHistoriesAction } from '../auditStatusHistories';
import { modelizeApiAuditStatusHistoriesToByPageOrScriptIdAndAuditParametersId } from '../auditStatusHistories/modelizer';
import { ApiAuditStatusHistoryType } from '../auditStatusHistories/types';
import { editPageError, editPageRequest, editPageSuccess, fetchPageAction } from '../pages';
import { modelizeApiPagesToById, modelizePage } from '../pages/modelizer';
import { ApiPageType } from '../pages/types';
import { fetchScriptAction } from '../scripts';
import { modelizeApiScriptsToById } from '../scripts/modelizer';
import { ApiScriptType } from '../scripts/types';
import {
  addAuditParameter,
  addAuditParameterToProjectError,
  addAuditParameterToProjectRequest,
  addAuditParameterToProjectSuccess,
  addMemberToProjectError,
  addMemberToProjectRequest,
  addMemberToProjectSuccess,
  addPageToProjectError,
  addPageToProjectRequest,
  addPageToProjectSuccess,
  deleteAuditParameterFromProjectError,
  deleteAuditParameterFromProjectRequest,
  deleteAuditParameterFromProjectSuccess,
  deleteMemberOfProjectError,
  deleteMemberOfProjectRequest,
  deleteMemberOfProjectSuccess,
  deletePageOfProjectError,
  deletePageOfProjectRequest,
  deletePageOfProjectSuccess,
  editMemberOfProjectError,
  editMemberOfProjectRequest,
  editMemberOfProjectSuccess,
  editProjectDetailsError,
  editProjectDetailsRequest,
  editProjectDetailsSuccess,
  fetchProjectError,
  fetchProjectRequest,
  fetchProjectsRequest,
  fetchProjectSuccess,
  saveFetchedProjects,
  setProjectToastrDisplay,
} from './actions';
import { modelizeProject, modelizeProjects } from './modelizer';
import { ApiProjectType } from './types';

function* fetchProjectsFailedHandler(error: Error, actionPayload: Record<string, string>) {
  yield put(
    fetchProjectError({ projectId: actionPayload.currentProjectId, errorMessage: error.message }),
  );
}

function* fetchProjectFailedHandler(error: Error, actionPayload: Record<string, string>) {
  yield put(fetchProjectError({ projectId: actionPayload.projectId, errorMessage: error.message }));
}

function* addMemberToProjectFailedHandler(error: Error, actionPayload: Record<string, string>) {
  yield put(
    addMemberToProjectError({ projectId: actionPayload.projectId, errorMessage: error.message }),
  );
  yield put(setProjectToastrDisplay({ toastrDisplay: 'addMemberError' }));
}

function* addPageToProjectFailedHandler(error: Error, actionPayload: Record<string, string>) {
  yield put(
    addPageToProjectError({ projectId: actionPayload.projectId, errorMessage: error.message }),
  );
  yield put(setProjectToastrDisplay({ toastrDisplay: 'addPageError' }));
}

function* deleteMemberOfProjectFailedHandler(error: Error, actionPayload: Record<string, string>) {
  yield put(
    deleteMemberOfProjectError({
      projectId: actionPayload.projectId,
      userId: actionPayload.userId,
      errorMessage: error.message,
    }),
  );
}

function* deletePageOfProjectFailedHandler(error: Error, actionPayload: Record<string, string>) {
  yield put(
    deletePageOfProjectError({
      projectId: actionPayload.projectId,
      pageId: actionPayload.pageId,
      errorMessage: error.message,
    }),
  );
  yield put(setProjectToastrDisplay({ toastrDisplay: 'deletePageError' }));
}

function* editMemberOfProjectFailedHandler(error: Error, actionPayload: Record<string, string>) {
  yield put(
    editMemberOfProjectError({
      projectId: actionPayload.projectId,
      userId: actionPayload.userId,
      errorMessage: error.message,
    }),
  );
}

function* editPageFailedHandler(error: Error, actionPayload: Record<string, any>) {
  yield put(
    editPageError({
      projectId: actionPayload.projectId,
      page: actionPayload.page,
    }),
  );
  yield put(setProjectToastrDisplay({ toastrDisplay: 'editPageError' }));
}

function* fetchProjects(action: ActionType<typeof fetchProjectsRequest>) {
  // this sagas will use a sort of lazy loading to start loading one project first, in order to speed
  // up the performance. If the user is on a specific project, then we start by loading this project.
  // on the contrary if the users requests all projects, then we load one at first with the /api/projects/first endpoint
  const firstProjectEndpoint = action.payload.currentProjectId
    ? `/api/projects/${action.payload.currentProjectId}/`
    : '/api/projects/first';
  const { body: firstProject }: { body: ApiProjectType } = yield call(
    makeGetRequest,
    firstProjectEndpoint,
    true,
    null,
  );
  // if the returned project is empty, put an empty state for projects
  if (firstProject.uuid) {
    yield put(saveFetchedProjects({ projects: [firstProject] }));
  } else {
    yield put(fetchProjectError({ projectId: null, errorMessage: 'No project returned' }));

    return;
  }
  // if the user has no other project, do not fetch them
  if (!firstProject.has_siblings) {
    return;
  }

  const endpoint = '/api/projects/';
  const { body: projects }: { body: ApiProjectType[] } = yield call(
    makeGetRequest,
    endpoint,
    true,
    null,
  );
  yield put(saveFetchedProjects({ projects }));
}

function* fetchProject(action: ActionType<typeof fetchProjectRequest>) {
  const endpoint = `/api/projects/${action.payload.projectId}/`;
  const { body: project }: { body: ApiProjectType } = yield call(
    makeGetRequest,
    endpoint,
    true,
    null,
  );
  yield put(saveFetchedProjects({ projects: [project] }));
}

function* addMemberToProject(action: ActionType<typeof addMemberToProjectRequest>) {
  yield put(setProjectToastrDisplay({ toastrDisplay: '' }));
  const endpoint = `/api/projects/${action.payload.projectId}/members`;
  const { body: projectResponse }: { body: ApiProjectType } = yield call(
    makePostRequest,
    endpoint,
    true,
    { user_id: action.payload.userId },
  );
  yield put(addMemberToProjectSuccess({ byId: modelizeProject(projectResponse) }));
  yield put(setProjectToastrDisplay({ toastrDisplay: 'addMemberSuccess' }));
}

function* addPageToProject(action: ActionType<typeof addPageToProjectRequest>) {
  yield put(setProjectToastrDisplay({ toastrDisplay: '' }));
  const endpoint = `/api/projects/${action.payload.projectId}/pages`;
  const { body: pageResponse }: { body: ApiPageType } = yield call(
    makePostRequest,
    endpoint,
    true,
    { name: action.payload.pageName, url: action.payload.pageUrl },
  );
  yield put(
    addPageToProjectSuccess({
      projectId: action.payload.projectId,
      page: modelizePage(pageResponse),
    }),
  );
  yield put(
    fetchPageAction.success({
      byId: {
        [pageResponse.uuid]: modelizePage(pageResponse),
      },
    }),
  );
  yield put(setProjectToastrDisplay({ toastrDisplay: 'addPageSuccess' }));
}

function* deleteMemberOfProject(action: ActionType<typeof deleteMemberOfProjectRequest>) {
  const endpoint = `/api/projects/${action.payload.projectId}/members/${action.payload.userId}`;
  yield call(makeDeleteRequest, endpoint, true);
  yield put(
    deleteMemberOfProjectSuccess({
      projectId: action.payload.projectId,
      userId: action.payload.userId,
    }),
  );
}

function* deletePageOfProject(action: ActionType<typeof deletePageOfProjectRequest>) {
  const endpoint = `/api/projects/${action.payload.projectId}/pages/${action.payload.pageId}`;
  yield call(makeDeleteRequest, endpoint, true);
  yield put(
    deletePageOfProjectSuccess({
      projectId: action.payload.projectId,
      pageId: action.payload.pageId,
    }),
  );
  yield put(setProjectToastrDisplay({ toastrDisplay: 'deletePageSuccess' }));
}

function* editMemberOfProject(action: ActionType<typeof editMemberOfProjectRequest>) {
  const endpoint = `/api/projects/${action.payload.projectId}/members/${action.payload.userId}`;
  yield call(makePutRequest, endpoint, true, { is_admin: action.payload.isAdmin });
  yield put(
    editMemberOfProjectSuccess({
      projectId: action.payload.projectId,
      userId: action.payload.userId,
      isAdmin: action.payload.isAdmin,
    }),
  );
}

function* editPage(action: ActionType<typeof editPageRequest>) {
  const endpoint = `/api/projects/${action.payload.projectId}/pages/${action.payload.page.uuid}`;
  const { body: pageResponse }: { body: ApiPageType } = yield call(makePutRequest, endpoint, true, {
    name: action.payload.page.name,
    url: action.payload.page.url,
  });
  yield put(editPageSuccess({ page: modelizePage(pageResponse) }));
  yield put(setProjectToastrDisplay({ toastrDisplay: 'editPageSuccess' }));
}

function* saveProjectsToStore(action: ActionType<typeof saveFetchedProjects>) {
  const projects = action.payload.projects;
  yield put(
    fetchPageAction.success({
      byId: modelizeApiPagesToById(
        projects.reduce((apiPages: ApiPageType[], project: ApiProjectType) => {
          return apiPages.concat(project.pages);
        }, []),
      ),
    }),
  );
  yield put(
    fetchScriptAction.success({
      byId: modelizeApiScriptsToById(
        projects.reduce((apiScripts: ApiScriptType[], project: ApiProjectType) => {
          return apiScripts.concat(project.scripts);
        }, []),
      ),
    }),
  );
  yield put(
    fetchAuditParametersAction.success({
      byId: modelizeApiAuditParametersListToById(
        projects.reduce(
          (apiAuditParametersList: ApiAuditParametersType[], project: ApiProjectType) => {
            return apiAuditParametersList.concat(project.audit_parameters_list);
          },
          [],
        ),
      ),
    }),
  );

  const allApiAuditStatusHistories = projects.reduce(
    (apiAuditStatusHistories: ApiAuditStatusHistoryType[], project: ApiProjectType) => {
      return apiAuditStatusHistories
        .concat(
          project.pages.reduce(
            (pageStatusHistories: ApiAuditStatusHistoryType[], page: ApiPageType) => {
              return pageStatusHistories.concat(page.latest_audit_status_histories);
            },
            [],
          ),
        )
        .concat(
          project.scripts.reduce(
            (scriptStatusHistories: ApiAuditStatusHistoryType[], script: ApiScriptType) => {
              return scriptStatusHistories.concat(script.latest_audit_status_histories);
            },
            [],
          ),
        );
    },
    [],
  );
  yield put(
    fetchAuditStatusHistoriesAction.success({
      byPageOrScriptIdAndAuditParametersId: modelizeApiAuditStatusHistoriesToByPageOrScriptIdAndAuditParametersId(
        allApiAuditStatusHistories,
      ),
    }),
  );
  // launch polling for all non-success and non-error auditStatusHistories
  yield all(
    allApiAuditStatusHistories.map((apiAuditStatusHistory) =>
      apiAuditStatusHistory.status === 'PENDING' || apiAuditStatusHistory.status === 'REQUESTED'
        ? put(
            pollAuditStatusAction({
              auditId: apiAuditStatusHistory.audit_id,
              pageOrScriptId: apiAuditStatusHistory.page_id || apiAuditStatusHistory.script_id,
            }),
          )
        : // the all() effect requires effect types for all its children, so we use this useless call effect
          call(() => null),
    ),
  );
  yield put(fetchProjectSuccess({ byId: modelizeProjects(projects) }));
}

function* editProjectDetails(action: ActionType<typeof editProjectDetailsRequest>) {
  const endpoint = `/api/projects/${action.payload.projectId}/`;
  const { body: projectResponse }: { body: ApiProjectType } = yield call(
    makePutRequest,
    endpoint,
    true,
    { ...action.payload.payload },
  );
  yield call(makePostRequest, '/api/projects/available_audit_parameters/discover', true, {
    wpt_instance_url: action.payload.payload.wpt_instance_url,
  });
  yield put(editProjectDetailsSuccess({ byId: modelizeProject(projectResponse) }));
  yield put(setProjectToastrDisplay({ toastrDisplay: 'editProjectDetailsSuccess' }));
}

function* editProjectDetailsFailedHandler(error: Error, actionPayload: Record<string, string>) {
  yield put(
    editProjectDetailsError({
      projectId: actionPayload.projectId,
      errorMessage: error.message,
    }),
  );
  yield put(setProjectToastrDisplay({ toastrDisplay: 'editProjectDetailsError' }));
}

function* addAuditParameterToProject(action: ActionType<typeof addAuditParameterToProjectRequest>) {
  const endpoint = `/api/projects/${action.payload.projectId}/audit_parameters`;
  const { body: auditParameterResponse }: { body: ApiAuditParametersType } = yield call(
    makePostRequest,
    endpoint,
    true,
    {
      configuration: action.payload.auditParameterConfigurationId,
      network_shape: action.payload.auditParameterNetworkShape,
      name: action.payload.auditParameterName,
    },
  );
  yield put(
    addAuditParameter({
      byId: {
        [auditParameterResponse.uuid]: modelizeAuditParameters(auditParameterResponse),
      },
    }),
  );
  yield put(
    addAuditParameterToProjectSuccess({
      projectId: action.payload.projectId,
      auditParameter: modelizeAuditParameters(auditParameterResponse),
    }),
  );
  yield put(setProjectToastrDisplay({ toastrDisplay: 'addAuditParameterSuccess' }));
}

function* addAuditParameterToProjectFailedHandler(
  error: Error,
  actionPayload: Record<string, string>,
) {
  yield put(
    addAuditParameterToProjectError({
      projectId: actionPayload.projectId,
      errorMessage: error.message,
    }),
  );
  yield put(setProjectToastrDisplay({ toastrDisplay: 'addAuditParameterError' }));
}

function* deleteAuditParameterFromProject(
  action: ActionType<typeof deleteAuditParameterFromProjectRequest>,
) {
  const endpoint = `/api/projects/${action.payload.projectId}/audit_parameters/${action.payload.auditParameterId}`;
  yield call(makeDeleteRequest, endpoint, true);
  yield put(
    deleteAuditParameterFromProjectSuccess({
      projectId: action.payload.projectId,
      auditParameterId: action.payload.auditParameterId,
    }),
  );
  yield put(setProjectToastrDisplay({ toastrDisplay: 'deleteAuditParameterSuccess' }));
}

function* deleteAuditParameterFromProjectFailedHandler(
  error: Error,
  actionPayload: Record<string, string>,
) {
  yield put(
    deleteAuditParameterFromProjectError({
      projectId: actionPayload.projectId,
      errorMessage: error.message,
    }),
  );
  yield put(setProjectToastrDisplay({ toastrDisplay: 'deleteAuditParameterError' }));
}

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
    getType(editMemberOfProjectRequest),
    handleAPIExceptions(editMemberOfProject, editMemberOfProjectFailedHandler),
  );
  yield takeEvery(
    getType(addPageToProjectRequest),
    handleAPIExceptions(addPageToProject, addPageToProjectFailedHandler),
  );
  yield takeEvery(getType(editPageRequest), handleAPIExceptions(editPage, editPageFailedHandler));
  yield takeEvery(
    getType(deleteMemberOfProjectRequest),
    handleAPIExceptions(deleteMemberOfProject, deleteMemberOfProjectFailedHandler),
  );
  yield takeEvery(
    getType(deletePageOfProjectRequest),
    handleAPIExceptions(deletePageOfProject, deletePageOfProjectFailedHandler),
  );
  yield takeEvery(
    getType(fetchProjectsRequest),
    handleAPIExceptions(fetchProjects, fetchProjectsFailedHandler),
  );
  yield takeEvery(getType(saveFetchedProjects), saveProjectsToStore);
  yield takeEvery(
    getType(editProjectDetailsRequest),
    handleAPIExceptions(editProjectDetails, editProjectDetailsFailedHandler),
  );
  yield takeEvery(
    getType(addAuditParameterToProjectRequest),
    handleAPIExceptions(addAuditParameterToProject, addAuditParameterToProjectFailedHandler),
  );
  yield takeEvery(
    getType(deleteAuditParameterFromProjectRequest),
    handleAPIExceptions(
      deleteAuditParameterFromProject,
      deleteAuditParameterFromProjectFailedHandler,
    ),
  );
}
