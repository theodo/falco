import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import {
  fetchLastUpdateOfWhatsNew,
} from './actions';

export type ContentAction = ActionType<typeof fetchLastUpdateOfWhatsNew>;

export type ContentState = Readonly<{ lastUpdateOfWhatsNew: string | null }>;

const initialState: ContentState = { lastUpdateOfWhatsNew: null };

const reducer = (state: ContentState = initialState, action: AnyAction) => {
  const typedAction = action as ContentAction;
  switch (typedAction.type) {
    case getType(fetchLastUpdateOfWhatsNew.success):
      return {
        ...state,
        lastUpdateOfWhatsNew: typedAction.payload.lastUpdateNewsLetter,
      };
    default:
      return state;
  }
};

export default reducer;
