import { all } from 'redux-saga/effects';

import { sagas as auditResultsSagas } from 'redux/auditResults';
import { sagas as contentSagas } from 'redux/content';
import { sagas as auditStatusHistoriesSagas } from 'redux/entities/auditStatusHistories';
import { sagas as projectsSagas } from 'redux/entities/projects';
import { sagas as leadSagas } from 'redux/lead';
import { sagas as loginSagas } from 'redux/login';
import { sagas as userSagas } from 'redux/user';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([leadSagas(), loginSagas(), projectsSagas(), auditResultsSagas(), userSagas(), contentSagas(), auditStatusHistoriesSagas()]);
}
