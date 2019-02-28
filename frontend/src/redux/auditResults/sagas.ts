import { call, put, takeEvery } from 'redux-saga/effects';
import { makeGetRequest } from 'services/networking/request';
import { ActionType, getType } from 'typesafe-actions';
import {
  fetchAuditResultsRequest,
  fetchAuditResultsSuccess,
  fetchAuditResultsError,
} from './actions';
import { modelizeAuditResults, getSortAuditResultsId } from './modelizer';
import { ApiAuditResultType } from './types';
import { handleAPIExceptions } from 'services/networking/handleAPIExceptions';

function* fetchAuditResultsFailedHandler(error: Error) {
  yield put(fetchAuditResultsError({ errorMessage: error.message }));
}

export function* fetchAuditResults(action: ActionType<typeof fetchAuditResultsRequest>) {
  const endpoint = `/audits/results`;
  const { pageId } = action.payload;
  const { body: auditResults }: { body: ApiAuditResultType[] } = yield call(
    makeGetRequest,
    endpoint,
    {
      page: pageId,
    },
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
