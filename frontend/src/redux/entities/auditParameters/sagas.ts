import { call, put, takeEvery } from 'redux-saga/effects';
import { setProjectToastrDisplay } from 'redux/entities/projects';
import { handleAPIExceptions } from 'services/networking/handleAPIExceptions';
import { makePutRequest } from 'services/networking/request';
import { ActionType, getType } from 'typesafe-actions';
import {
  editAuditParameterError,
  editAuditParameterRequest,
  editAuditParameterSuccess,
} from './actions';
import { modelizeAuditParametersById } from './modelizer';
import { ApiAuditParametersType } from './types';

function* editAuditParameter(action: ActionType<typeof editAuditParameterRequest>) {
  const endpoint = `/api/projects/${action.payload.projectId}/audit_parameters/${
    action.payload.auditParameter.uuid
  }`;
  const { body: auditParameterResponse }: { body: ApiAuditParametersType } = yield call(
    makePutRequest,
    endpoint,
    true,
    {
      name: action.payload.auditParameter.name,
      network_shape: action.payload.auditParameter.network_shape,
      configuration: action.payload.auditParameter.configuration_id,
    },
  );
  yield put(
    editAuditParameterSuccess({ byId: modelizeAuditParametersById(auditParameterResponse) }),
  );
  yield put(setProjectToastrDisplay({ toastrDisplay: 'editAuditParameterSuccess' }));
}

function* editAuditParameterFailedHandler(error: Error, actionPayload: Record<string, string>) {
  yield put(
    editAuditParameterError({ projectId: actionPayload.projectId, errorMessage: error.message }),
  );
  yield put(setProjectToastrDisplay({ toastrDisplay: 'editAuditParameterError' }));
}

export default function* auditParametersSaga() {
  yield takeEvery(
    getType(editAuditParameterRequest),
    handleAPIExceptions(editAuditParameter, editAuditParameterFailedHandler),
  );
}
