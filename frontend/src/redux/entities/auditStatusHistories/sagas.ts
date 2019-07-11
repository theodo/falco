import { delay } from "redux-saga";
import { call, fork, put, race, take, takeEvery } from 'redux-saga/effects'
import { fetchAuditResultsRequest } from "redux/auditResults";
import { makeGetRequest } from "services/networking/request";
import { ActionType, getType } from "typesafe-actions";
import { fetchAuditStatusHistoriesAction, pollAuditStatusHistoriesAction, stopPollingAuditStatusHistoriesAction } from "./actions";
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
    };
};

function* pollAuditStatusHistories(auditId: string) {
    try {
        const endpoint = `/api/audits/${auditId}/status`;
        const { body: auditStatusHistory }: { body: ApiAuditStatusHistoryType } = yield call(makeGetRequest, endpoint, true, null);

        // save the response to the store before continuing the polling
        yield put(fetchAuditStatusHistoriesAction.success({
            byId: modelizeApiAuditStatusHistoriesToById([auditStatusHistory]),
            byPageOrScriptIdAndAuditParametersId: modelizeApiAuditStatusHistoriesToByPageOrScriptIdAndAuditParametersId([auditStatusHistory]),
        }));

        const pollingIsFinished = (auditStatusHistory.status === "SUCCESS" || auditStatusHistory.status === "ERROR");
        if (pollingIsFinished) {
            yield put(stopPollingAuditStatusHistoriesAction({
                lastAuditStatusHistory: auditStatusHistory,
            }));
        }
        else {
            // wait for 10 seconds before the next polling
            yield call(delay, 10000);
            yield put(pollAuditStatusHistoriesAction({ auditId }))
        };
    } catch (error) {
        yield put(fetchAuditStatusHistoriesAction.failure({ errorMessage: error.toString() }));
        return;
    };
};

function* fetchAuditResultsAfterPolling(action: ActionType<typeof stopPollingAuditStatusHistoriesAction>) {
    const auditStatusHistory = action.payload.lastAuditStatusHistory;
    yield put(fetchAuditResultsRequest({
        auditParametersId: auditStatusHistory.parameters_id,
        pageOrScriptId: auditStatusHistory.page_id || auditStatusHistory.script_id,
        type: auditStatusHistory.page_id ? 'page' : 'script',
    }))
};

function* watchPollAuditStatusHistories() {
    // inspired by https://gist.github.com/ellismarkf/d2824ea9d668c4c00af5112633f91a1d
    while (true) {
        const pollAction: ActionType<typeof pollAuditStatusHistoriesAction> = yield take(pollAuditStatusHistoriesAction);
        const auditId = pollAction.payload.auditId;
        yield race({
            continuePolling: fork(pollAuditStatusHistories, auditId),
            stopPolling: take(stopPollingAuditStatusHistoriesAction)
        });
    };
};

export default function* auditStatusHistoriesSagas() {
    yield takeEvery(
        getType(fetchAuditStatusHistoriesAction.request),
        fetchAuditStatusHistories,
    );
    yield takeEvery(
        getType(stopPollingAuditStatusHistoriesAction),
        fetchAuditResultsAfterPolling,
    );
    yield watchPollAuditStatusHistories();
};
