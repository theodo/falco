import { call, put, takeEvery } from 'redux-saga/effects';
import { makeGetRequest } from 'services/networking/request';
import { ActionType, getType } from 'typesafe-actions';
import {
  fetchAuditResultsRequest,
  fetchAuditResultsSuccess,
  fetchAuditResultsError,
} from './actions';
import { modelizeAuditResults } from './modelizer';
import { ApiAuditResultType } from './types';

export function* fetchAuditResults(action: ActionType<typeof fetchAuditResultsRequest>) {
  const endpoint = `/audits/results`;
  const { pageId } = action.payload;
  try {
    const { body: auditResults }: { body: ApiAuditResultType[] } = yield call(
      makeGetRequest,
      endpoint,
      {
        page: pageId,
      },
    );
    yield put(fetchAuditResultsSuccess({ byAuditId: modelizeAuditResults(auditResults) }));
  } catch (error) {
    yield put(fetchAuditResultsError({ errorMessage: error.message }));
  }
}

export default function* projectsSaga() {
  yield takeEvery(getType(fetchAuditResultsRequest), fetchAuditResults);
}
