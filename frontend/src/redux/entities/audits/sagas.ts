import { all, call, put, takeEvery } from 'redux-saga/effects'
import { handleAPIExceptions } from 'services/networking/handleAPIExceptions';
import { makePostRequest } from 'services/networking/request';
import { ActionType, getType } from "typesafe-actions";
import { pollAuditStatusHistoriesAction } from '../auditStatusHistories';
import { launchAuditAction } from "./actions";
import { modelizeAudit } from './modelizer';
import { ApiAuditType } from "./types";


function* launchAuditsFailedHandler(error: Error) {
    yield put(launchAuditAction.failure({ errorMessage: error.message }));
};

function* launchAuditsSaga(action: ActionType<typeof launchAuditAction.request>) {
    const endpoint = `/api/audits/request?project=${action.payload.projectId}`;
    const { body: apiAuditsList }: { body: ApiAuditType[] } = yield call(
        makePostRequest,
        endpoint,
        true,
        {},
    );

    // launch auditsStatusHistories polling
    yield all(apiAuditsList.map(apiAudit => put(pollAuditStatusHistoriesAction({ auditId: apiAudit.uuid }))));

    // signal lauch success (useless for now, will be used to prevent double audits launch)
    yield put(launchAuditAction.success({
        audits: apiAuditsList.map(modelizeAudit),
    }));
};

export default function* auditsSaga() {
    yield takeEvery(
        getType(launchAuditAction.request),
        handleAPIExceptions(launchAuditsSaga, launchAuditsFailedHandler),
    );
};
