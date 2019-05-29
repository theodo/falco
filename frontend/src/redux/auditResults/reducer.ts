import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { fetchAuditResultsSuccess } from './actions';
import { AuditResultType, SortedPageAuditResultIds, SortedScriptAuditResultIds } from './types';

export type auditResultsAction = ActionType<typeof fetchAuditResultsSuccess>;

export type auditResultsState = Readonly<{
  byAuditId: Readonly<Record<string, AuditResultType>>;
  sortedByPageId: Record<string, SortedPageAuditResultIds>;
  sortedByScriptId: Record<string, SortedScriptAuditResultIds>;
}>;

const initialState: auditResultsState = { byAuditId: {}, sortedByPageId: {}, sortedByScriptId: {} };

const reducer = (state: auditResultsState = initialState, action: AnyAction) => {
  const typedAction = action as auditResultsAction;
  switch (typedAction.type) {
    case getType(fetchAuditResultsSuccess):
      const currentSortedByPageId = { ...state.sortedByPageId };
      const currentSortedByScriptId = { ...state.sortedByScriptId };
      let newSortedByPageId = { ...currentSortedByPageId };
      let newSortedByScriptId = { ...currentSortedByScriptId };

      if (action.payload.pageId) {
        const currentSortedAuditResultsIds =
          action.payload.pageId in currentSortedByPageId
            ? currentSortedByPageId[action.payload.pageId].byAuditParametersId
            : {};
        newSortedByPageId = {
          ...currentSortedByPageId,
          [action.payload.pageId]: {
            byAuditParametersId: {
              ...currentSortedAuditResultsIds,
              [action.payload.auditParametersId]: action.payload.sortedAuditResultsIds,
            },
          },
        };
      }

      if (action.payload.scriptId) {
        const currentSortedAuditResultsIds =
          action.payload.scriptId in currentSortedByScriptId
            ? currentSortedByScriptId[action.payload.scriptId].byAuditParametersId
            : {};
        newSortedByScriptId = {
          ...currentSortedByScriptId,
          [action.payload.scriptId]: {
            byAuditParametersId: {
              ...currentSortedAuditResultsIds,
              [action.payload.auditParametersId]: action.payload.sortedAuditResultsIds,
            },
          },
        };
      }

      return {
        ...state,
        byAuditId: {
          ...state.byAuditId,
          ...action.payload.byAuditId,
        },
        sortedByPageId: {
          ...newSortedByPageId,
        },
        sortedByScriptId: {
          ...newSortedByScriptId,
        },
      };
    default:
      return state;
  }
};

export default reducer;
