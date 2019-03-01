import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { fetchPagesSuccess } from './actions';
import { PageType } from './types';

export type pagesAction = ActionType<typeof fetchPagesSuccess>;

export type pagesState = Readonly<{
  byId: Readonly<Record<string, PageType>>;
}>;

const initialState: pagesState = { byId: {} };

const reducer = (state: pagesState = initialState, action: AnyAction) => {
  const typedAction = action as pagesAction;
  switch (typedAction.type) {
    case getType(fetchPagesSuccess):
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.payload.byId,
        },
      };
    default:
      return state;
  }
};

export default reducer;
