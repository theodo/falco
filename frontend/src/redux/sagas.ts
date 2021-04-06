import { all } from 'redux-saga/effects';

import { sagas as auditResultsSagas } from 'redux/auditResults';
import { sagas as auditParametersSaga } from 'redux/entities/auditParameters';
import { sagas as auditsSagas } from 'redux/entities/audits';
import { sagas as auditStatusHistoriesSagas } from 'redux/entities/auditStatusHistories';
import { sagas as projectsSagas } from 'redux/entities/projects';
import { sagas as loginSagas } from 'redux/login';
import { sagas as signUpSagas } from 'redux/sign-up';
import { sagas as userSagas } from 'redux/user';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    loginSagas(),
    signUpSagas(),
    projectsSagas(),
    auditsSagas(),
    auditResultsSagas(),
    userSagas(),
    auditStatusHistoriesSagas(),
    auditParametersSaga(),
  ]);
}
