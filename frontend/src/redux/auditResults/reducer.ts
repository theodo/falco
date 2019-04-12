import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { fetchAuditResultsSuccess } from './actions';
import { AuditResultType } from './types';

export type auditResultsAction = ActionType<typeof fetchAuditResultsSuccess>;

export type auditResultsState = Readonly<{
  byAuditId: Readonly<Record<string, AuditResultType>>;
  sortedByPageId: Record<string, string[]>;
  sortedByScriptId: Record<string, {[key: string]: string[]}>;
}>;

const initialState: auditResultsState = { byAuditId: {}, sortedByPageId: {}, sortedByScriptId: {} };

const reducer = (state: auditResultsState = initialState, action: AnyAction) => {
  const typedAction = action as auditResultsAction;
  switch (typedAction.type) {
    case getType(fetchAuditResultsSuccess):
      return {
        ...state,
        byAuditId: {
          ...state.byAuditId,
          ...action.payload.byAuditId,
        },
        sortedByPageId: {
          ...state.sortedByPageId,
          ...action.payload.sortedByPageId,
        },
        sortedByScriptId: {
          ...state.sortedByScriptId,
          ...action.payload.sortedByScriptId,
        },
      };
    default:
      return state;
  }
};

export default reducer;
