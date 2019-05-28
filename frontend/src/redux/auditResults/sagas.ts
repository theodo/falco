import groupBy from 'lodash/groupBy';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

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
  const { auditParametersId, pageOrScriptId, type } = action.payload;
  const payload: { audit_parameters: string; page?: string; script?: string } = {
    audit_parameters: auditParametersId,
  };
  switch (type) {
    case 'page':
      payload.page = pageOrScriptId;
      break;
    case 'script':
      payload.script = pageOrScriptId;
      break;
    default:
      break;
  }
  const { body: auditResults }: { body: ApiAuditResultType[] } = yield call(
    makeGetRequest,
    endpoint,
    true,
    payload,
  );
  const modelizedAuditResults = modelizeAuditResultsForPage(auditResults);
  const sortedAuditResultsIds = getSortAuditResultsId(
    Object.keys(modelizedAuditResults).map(auditId => modelizedAuditResults[auditId]),
  );
  let sortedByPageId;
  let sortedByScriptId;
  if (type === 'page') {
    sortedByPageId = { [pageOrScriptId]: sortedAuditResultsIds };
  }
  if (type === 'script') {
    sortedByScriptId = {
      [pageOrScriptId]: groupBy(
        sortedAuditResultsIds,
        auditId => modelizedAuditResults[auditId].scriptStepNumber,
      ),
    };
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
