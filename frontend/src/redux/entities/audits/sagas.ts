import { delay } from 'redux-saga';
import { all, call, fork, put, race, take, takeEvery } from 'redux-saga/effects'
import { fetchAuditResultsRequest } from 'redux/auditResults';
import { handleAPIExceptions } from 'services/networking/handleAPIExceptions';
import { makeGetRequest, makePostRequest } from 'services/networking/request';
import { ActionType, getType } from "typesafe-actions";
import { fetchAuditStatusHistoriesAction } from '../auditStatusHistories';
import { modelizeApiAuditStatusHistoriesToByPageOrScriptIdAndAuditParametersId, modelizeAuditStatusHistory } from '../auditStatusHistories/modelizer';
import { ApiAuditStatusHistoryType } from '../auditStatusHistories/types';
import { launchAuditAction, pollAuditStatusAction, stopPollingAuditStatusAction } from "./actions";
import { modelizeAudit } from './modelizer';
import { ApiAuditType } from "./types";


function* launchAuditsFailedHandler(error: Error) {
    yield put(launchAuditAction.failure({ errorMessage: error.message }));
};

function* launchAuditsSaga(action: ActionType<typeof launchAuditAction.request>) {
    const endpoint = `/api/audits/${action.payload.projectId}/request`;
    const { body: apiAuditsList }: { body: ApiAuditType[] } = yield call(
        makePostRequest,
        endpoint,
        true,
        {},
    );

    // launch auditsStatusHistories polling
    yield all(apiAuditsList.map(apiAudit => put(pollAuditStatusAction({
        auditId: apiAudit.uuid,
        pageOrScriptId: apiAudit.page || apiAudit.script || "",
    }))));

    // signal launch success (useless for now, will be used to prevent double audits launch)
    yield put(launchAuditAction.success({
        audits: apiAuditsList.map(modelizeAudit),
    }));
};

function* pollAuditStatusHistories(auditId: string, pageOrScriptId: string) {
    try {
        const endpoint = `/api/audits/${auditId}/status`;
        const { body: auditStatusHistory }: { body: ApiAuditStatusHistoryType } = yield call(makeGetRequest, endpoint, true, null);

        // save the response to the store before continuing the polling
        yield put(fetchAuditStatusHistoriesAction.success({
            byPageOrScriptIdAndAuditParametersId: modelizeApiAuditStatusHistoriesToByPageOrScriptIdAndAuditParametersId([auditStatusHistory]),
        }));

        const pollingIsFinished = (auditStatusHistory.status === "SUCCESS" || auditStatusHistory.status === "ERROR");
        if (pollingIsFinished) {
            yield put(stopPollingAuditStatusAction({
                lastAuditStatusHistory: modelizeAuditStatusHistory(auditStatusHistory),
            }));
        }
        else {
            // wait for 10 seconds before the next polling
            yield call(delay, 10000);
            yield put(pollAuditStatusAction({ auditId, pageOrScriptId }))
        };
    } catch (error) {
        yield put(fetchAuditStatusHistoriesAction.failure({ errorMessage: error.toString() }));
    };
};

function* fetchAuditResultsAfterPolling(action: ActionType<typeof stopPollingAuditStatusAction>) {
    const auditStatusHistory = action.payload.lastAuditStatusHistory;
    yield put(fetchAuditResultsRequest({
        auditParametersId: auditStatusHistory.auditParametersId,
        pageOrScriptId: auditStatusHistory.pageId || auditStatusHistory.scriptId || "",
        type: auditStatusHistory.pageId ? 'page' : 'script',
    }))
};

function* watchPollAuditStatusHistories() {
    // inspired by https://gist.github.com/ellismarkf/d2824ea9d668c4c00af5112633f91a1d
    while (true) {
        const pollAction: ActionType<typeof pollAuditStatusAction> = yield take(pollAuditStatusAction);
        const { auditId, pageOrScriptId } = pollAction.payload;
        yield race({
            continuePolling: fork(pollAuditStatusHistories, auditId, pageOrScriptId),
            stopPolling: take(stopPollingAuditStatusAction)
        });
    };
};

export default function* auditsSaga() {
    yield takeEvery(
        getType(launchAuditAction.request),
        handleAPIExceptions(launchAuditsSaga, launchAuditsFailedHandler),
    );
    yield takeEvery(
        getType(stopPollingAuditStatusAction),
        fetchAuditResultsAfterPolling,
    );
    yield watchPollAuditStatusHistories();
};
