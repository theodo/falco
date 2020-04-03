import { AnyAction } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ActionType, getType } from 'typesafe-actions';

import { MetricType } from 'redux/auditResults/types';
import {
  setCurrentAuditParametersId,
  setCurrentPageId,
  setCurrentScriptId,
  setCurrentScriptStepId,
  updateAllDisplayedMetrics,
  updateDisplayedMetrics,
} from './actions';

export type ParametersAction = ActionType<
  | typeof setCurrentAuditParametersId
  | typeof setCurrentPageId
  | typeof setCurrentScriptId
  | typeof setCurrentScriptStepId
  | typeof updateDisplayedMetrics
  | typeof updateAllDisplayedMetrics
>;

export type ParametersState = Readonly<{
  currentAuditParametersId: string | null;
  currentPageId: string | null;
  currentScriptId: string | null;
  currentScriptStepId: string | null;
  currentDisplayedMetrics: Record<string, MetricType[]>;
}>;

const persistConfig = {
  key: 'parameters',
  whitelist: ['currentDisplayedMetrics'],
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
  currentDisplayedMetrics: {},
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
    case getType(updateDisplayedMetrics):
      return {
        ...state,
        currentDisplayedMetrics: {
          ...state.currentDisplayedMetrics,
          [action.payload.projectId]: action.payload.displayedMetrics,
        },
      };
    case getType(updateAllDisplayedMetrics):
      return {
        ...state,
        currentDisplayedMetrics: {
          ...state.currentDisplayedMetrics,
            ...action.payload.displayedMetrics,
          }
      }
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
