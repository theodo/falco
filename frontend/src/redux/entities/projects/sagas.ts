import { all, call, put, takeEvery } from 'redux-saga/effects';
import { makeGetRequest } from 'services/networking/request';
import { ActionType, getType } from 'typesafe-actions';

import { fetchAuditParametersAction } from '../auditParameters/actions';
import { modelizeApiAuditParametersListToById } from '../auditParameters/modelizer';
import { ApiAuditParametersType } from '../auditParameters/types';
import { fetchAuditStatusHistoriesAction, pollAuditStatusHistoriesAction } from '../auditStatusHistories';
import {
  modelizeApiAuditStatusHistoriesToById,
  modelizeApiAuditStatusHistoriesToByPageOrScriptIdAndAuditParametersId,
} from '../auditStatusHistories/modelizer';
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
import { modelizeProjects } from './modelizer';
import { ApiFirstProjectType, ApiProjectType } from './types';


function* fetchProjects() {
  try {
    const firstProjectEndpoint = '/api/projects/first';
    const { body: firstProject }: { body: ApiFirstProjectType } = yield call(
      makeGetRequest,
      firstProjectEndpoint,
      true,
      null,
    );
    yield saveProjectsToStore([firstProject.project]);
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
    yield saveProjectsToStore(projects);
  } catch (error) {
    yield put(fetchProjectError({ projectId: action.payload.currentProjectId || null, errorMessage: error.toString() }));
  }
};

function* fetchProject(action: ActionType<typeof fetchProjectRequest>) {
  try {
    const endpoint = `/api/projects/${action.payload.projectId}/`;
    const { body: project }: { body: ApiProjectType } = yield call(
      makeGetRequest,
      endpoint,
      true,
      null,
    );
    yield saveProjectsToStore([project]);
  } catch (error) {
    yield put(fetchProjectError({ projectId: action.payload.projectId, errorMessage: error.toString() }));
  }
};

function* saveProjectsToStore(projects: ApiProjectType[]) {
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
    byId: modelizeApiAuditStatusHistoriesToById(allApiAuditStatusHistories),
    byPageOrScriptIdAndAuditParametersId: modelizeApiAuditStatusHistoriesToByPageOrScriptIdAndAuditParametersId(allApiAuditStatusHistories),
  }));
  // launch polling for all non-success and non-error auditStatusHistories
  yield all(allApiAuditStatusHistories.map(
    apiAuditStatusHistory => (apiAuditStatusHistory.status === "PENDING" || apiAuditStatusHistory.status === "REQUESTED")
      ? put(pollAuditStatusHistoriesAction({ auditId: apiAuditStatusHistory.audit_id }))
      // the all() effect requires effect types for all its children, so we use this useless call effect
      : call(() => null)
  ));
  yield put(fetchProjectSuccess({ byId: modelizeProjects(projects) }));
};


export default function* projectsSaga() {
  yield takeEvery(
    getType(fetchProjectRequest),
    fetchProject,
  );
  yield takeEvery(
    getType(fetchProjectsRequest),
    fetchProjects,
  );
};
