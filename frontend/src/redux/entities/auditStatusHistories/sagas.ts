import { call, put, takeEvery } from 'redux-saga/effects';
import { makeGetRequest } from 'services/networking/request';
import { ActionType, getType } from 'typesafe-actions';
import { fetchAuditStatusHistoriesAction } from './actions';
import { modelizeApiAuditStatusHistoriesToByPageOrScriptIdAndAuditParametersId } from './modelizer';
import { ApiAuditStatusHistoryType } from './types';

function* fetchAuditStatusHistories(
  action: ActionType<typeof fetchAuditStatusHistoriesAction.request>,
) {
  try {
    const endpoint = `/api/audits/${action.payload.auditId}/status`;
    const { body: auditStatusHistory }: { body: ApiAuditStatusHistoryType } = yield call(
      makeGetRequest,
      endpoint,
      true,
      null,
    );
    yield put(
      fetchAuditStatusHistoriesAction.success({
        byPageOrScriptIdAndAuditParametersId: modelizeApiAuditStatusHistoriesToByPageOrScriptIdAndAuditParametersId(
          [auditStatusHistory],
        ),
      }),
    );
  } catch (error) {
    yield put(fetchAuditStatusHistoriesAction.failure({ errorMessage: error.toString() }));
  }
}

export default function* auditStatusHistoriesSagas() {
  yield takeEvery(getType(fetchAuditStatusHistoriesAction.request), fetchAuditStatusHistories);
}
