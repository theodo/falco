import { all, call, put, takeEvery } from 'redux-saga/effects';
import { makeGetRequest } from "services/networking/request";
import { getType } from 'typesafe-actions';

import { fetchLastUpdateOfWhatsNew } from './actions';

export function* fetchLastUpdateOfWhatsNewSaga() {
    try {
        const endpoint = '/api/content/last_update_newsletter';
        const response = yield call(makeGetRequest, endpoint, true);
        yield put(fetchLastUpdateOfWhatsNew.success({ lastUpdateNewsLetter: response.body.last_update_newsletter }));
    } catch (error) {
        yield put(fetchLastUpdateOfWhatsNew.failure({ errorMessage: error.message }));
    }
};

export default function* contentSagas() {
    yield takeEvery(getType(fetchLastUpdateOfWhatsNew.request), fetchLastUpdateOfWhatsNewSaga);
};
