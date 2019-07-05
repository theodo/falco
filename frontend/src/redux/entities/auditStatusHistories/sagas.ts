import { delay, takeEvery } from "redux-saga";
import { call, fork, put, race, take } from 'redux-saga/effects'
import { makeGetRequest } from "services/networking/request";
import { ActionType, getType } from "typesafe-actions";
import { fetchAuditStatusHistoriesAction, pollAuditStatusHistoriesAction } from "./actions";
import { modelizeApiAuditStatusHistoriesToById, modelizeApiAuditStatusHistoriesToByPageOrScriptIdAndAuditParametersId } from "./modelizer";
import { ApiAuditStatusHistoryType } from "./types";


export function* fetchAuditStatusHistories(action: ActionType<typeof fetchAuditStatusHistoriesAction.request>) {
    try {
        const endpoint = `/api/audits/${action.payload.auditId}/status`;
        const { body: auditStatusHistory }: { body: ApiAuditStatusHistoryType } = yield call(
            makeGetRequest,
            endpoint,
            true,
            null,
        );
        yield put(fetchAuditStatusHistoriesAction.success({
            byId: modelizeApiAuditStatusHistoriesToById([auditStatusHistory]),
            byPageOrScriptIdAndAuditParametersId: modelizeApiAuditStatusHistoriesToByPageOrScriptIdAndAuditParametersId([auditStatusHistory]),
        }));
    } catch (error) {
        yield put(fetchAuditStatusHistoriesAction.failure({ errorMessage: error.toString() }));
        return;
    };
};




export default function* auditStatusHistoriesSagas() {
    yield takeEvery(
        getType(fetchAuditStatusHistoriesAction.request),
        fetchAuditStatusHistories,
    );
};
