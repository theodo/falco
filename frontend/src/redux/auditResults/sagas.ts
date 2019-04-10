import forEach from 'lodash/forEach';
import groupBy from 'lodash/groupBy';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import { getUserToken } from 'redux/login/selectors';
import { handleAPIExceptions } from 'services/networking/handleAPIExceptions';
import { makeGetRequest } from 'services/networking/request';

import {
  fetchAuditResultsError,
  fetchAuditResultsRequest,
  fetchAuditResultsSuccess,
} from './actions';
import { getSortAuditResultsId, modelizeAuditResultsForPage } from './modelizer';
import { ApiAuditResultType } from './types';

function* fetchAuditResultsFailedHandler(error: Error) {
  yield put(fetchAuditResultsError({ errorMessage: error.message }));
}

export function* fetchAuditResults(action: ActionType<typeof fetchAuditResultsRequest>) {
  const endpoint = `/api/audits/results`;
  const { id, type } = action.payload;
  const token = yield select(getUserToken);
  const payload: {page?: string; script?: string;} = {
  }
  switch (type) {
    case "page":
      payload.page = action.payload.id
      break;
    case "script":
      payload.script = action.payload.id
    default:
      break;
  }
  const { body: auditResults }: { body: ApiAuditResultType[] } = yield call(
    makeGetRequest,
    endpoint,
    payload,
    token,
  );
  const modelizedAuditResults = modelizeAuditResultsForPage(auditResults);
  const sortedAuditResultsIds = getSortAuditResultsId(
    Object.keys(modelizedAuditResults).map(auditId => modelizedAuditResults[auditId])
  )
  let sortedByPageId;
  let sortedByScriptId;
  if (type === "page") {
    sortedByPageId = { [id]: sortedAuditResultsIds }
  }
  if (type === "script") {
    sortedByScriptId = { [id]: groupBy(sortedAuditResultsIds, (auditId) => modelizedAuditResults[auditId].scriptStepNumber) }
  }
  yield put(
    fetchAuditResultsSuccess({
      byAuditId: modelizedAuditResults,
      sortedByPageId,
      sortedByScriptId,
    }),
  );
}

export default function* projectsSaga() {
  yield takeEvery(
    getType(fetchAuditResultsRequest),
    handleAPIExceptions(fetchAuditResults, fetchAuditResultsFailedHandler),
  );
}
