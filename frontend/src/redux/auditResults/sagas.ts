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
import { getSortAuditResultsId, modelizeAuditResults } from './modelizer';
import { ApiAuditResultType } from './types';

function* fetchAuditResultsFailedHandler(error: Error) {
  yield put(fetchAuditResultsError({ errorMessage: error.message }));
}

export function* fetchAuditResults(action: ActionType<typeof fetchAuditResultsRequest>) {
  const endpoint = `/api/audits/results`;
  const { pageId } = action.payload;
  const token = yield select(getUserToken);
  const { body: auditResults }: { body: ApiAuditResultType[] } = yield call(
    makeGetRequest,
    endpoint,
    {
      page: pageId,
    },
    token,
  );
  const modelizedAuditResults = modelizeAuditResults(auditResults);
  const sortedAuditResultsIds = getSortAuditResultsId(
    Object.keys(modelizedAuditResults).map(auditId => modelizedAuditResults[auditId]),
  );
  yield put(
    fetchAuditResultsSuccess({
      byAuditId: modelizedAuditResults,
      sortedByPageId: { [pageId]: sortedAuditResultsIds },
    }),
  );
}

export default function* projectsSaga() {
  yield takeEvery(
    getType(fetchAuditResultsRequest),
    handleAPIExceptions(fetchAuditResults, fetchAuditResultsFailedHandler),
  );
}
