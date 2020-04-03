import { AnyAction } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ActionType, getType } from 'typesafe-actions';

import {
  setCurrentAuditParametersId,
  setCurrentPageId,
  setCurrentScriptId,
  setCurrentScriptStepId,
} from './actions';

export type ParametersAction = ActionType<
  | typeof setCurrentAuditParametersId
  | typeof setCurrentPageId
  | typeof setCurrentScriptId
  | typeof setCurrentScriptStepId
>;

export type ParametersState = Readonly<{
  currentAuditParametersId: string | null;
  currentPageId: string | null;
  currentScriptId: string | null;
  currentScriptStepId: string | null;
}>;

const persistConfig = {
  key: 'parameters',
  blacklist: [
    'currentAuditParametersId',
    'currentPageId',
    'currentScriptId',
    'currentScriptStepId',
  ],
  storage,
};

const initialState: ParametersState = {
  currentAuditParametersId: null,
  currentPageId: null,
  currentScriptId: null,
  currentScriptStepId: null,
};

const reducer = (state: ParametersState = initialState, action: AnyAction) => {
  const typedAction = action as ParametersAction;
  switch (typedAction.type) {
    case getType(setCurrentAuditParametersId):
      return {
        ...state,
        currentAuditParametersId: action.payload.auditParametersId ? action.payload.auditParametersId : null,
      };
    case getType(setCurrentPageId):
      return {
        ...state,
        currentPageId: action.payload.pageId ? action.payload.pageId : null,
      };
    case getType(setCurrentScriptId):
      return {
        ...state,
        currentScriptId: action.payload.scriptId ? action.payload.scriptId : null,
      };
    case getType(setCurrentScriptStepId):
      return {
        ...state,
        currentScriptStepId: action.payload.scriptStepId ? action.payload.scriptStepId : null,
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
