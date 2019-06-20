import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  fetchLastUpdateOfWhatsNew, registerClickOnWhatsNew,
} from './actions';

export type ContentAction = ActionType<typeof fetchLastUpdateOfWhatsNew | typeof registerClickOnWhatsNew>;

export type ContentState = Readonly<{
  lastUpdateOfWhatsNew: string | null;
  lastClickOnWhatsNew: string | null;
}>;

const initialState: ContentState = {
  lastUpdateOfWhatsNew: null,
  lastClickOnWhatsNew: null,
};

const persistConfig = {
  key: 'content',
  whitelist: ['lastClickOnWhatsNew'],
  blacklist: ['lastUpdateOfWhatsNew'],
  storage,
};

const reducer = (state: ContentState = initialState, action: AnyAction) => {
  const typedAction = action as ContentAction;
  switch (typedAction.type) {
    case getType(fetchLastUpdateOfWhatsNew.success):
      return {
        ...state,
        lastUpdateOfWhatsNew: typedAction.payload.lastUpdateNewsLetter,
      };
    case getType(registerClickOnWhatsNew):
      return {
        ...state,
        lastClickOnWhatsNew: typedAction.payload.lastClickOnWhatsNew,
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
