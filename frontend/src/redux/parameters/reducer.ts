import { AnyAction } from 'redux';
import { persistReducer } from 'redux-persist';
import { PersistState } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { ActionType, getType } from 'typesafe-actions';

import { MetricType } from 'redux/auditResults/types';
import { setCurrentAuditParametersId, updateDisplayedMetrics } from './actions';

export type ParametersAction = ActionType<typeof setCurrentAuditParametersId | typeof updateDisplayedMetrics>;

export type ParametersState = Readonly<{
  currentAuditParametersId: string | null;
  displayedMetrics: Record<string, MetricType[]>;
  _persist: PersistState;
}>;

const persistConfig = {
  key: 'parameters',
  whitelist: ['displayedMetrics'],
  blacklist: ['currentAuditParametersId'],
  storage,
};

const initialState: ParametersState = {
  currentAuditParametersId: null,
  displayedMetrics: {},
  _persist: {} as PersistState,
};

const reducer = (state: ParametersState = initialState, action: AnyAction) => {
  const typedAction = action as ParametersAction;
  switch (typedAction.type) {
    case getType(setCurrentAuditParametersId):
      return {
        ...state,
        currentAuditParametersId: action.payload.auditParametersId ? action.payload.auditParametersId : null,
      };
    case getType(updateDisplayedMetrics):
      return {
        ...state,
        displayedMetrics: {
          ...state.displayedMetrics,
          [action.payload.projectId]: action.payload.displayedMetrics,
        },
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
