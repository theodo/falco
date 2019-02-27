import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { fetchAuditResultsSuccess } from './actions';
import { AuditResultType } from './types';

export type auditResultsAction = ActionType<typeof fetchAuditResultsSuccess>;

export type auditResultsState = Readonly<{
  byAuditId: Readonly<Record<string, AuditResultType>>;
}>;

const initialState: auditResultsState = { byAuditId: {} };

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
      };
    default:
      return state;
  }
};

export default reducer;
