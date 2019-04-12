import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { fetchScriptsSuccess } from './actions';
import { ScriptType } from './types';

export type scriptsAction = ActionType<typeof fetchScriptsSuccess>;

export type scriptsState = Readonly<{
  byId: Readonly<Record<string, ScriptType>>;
}>;

const initialState: scriptsState = { byId: {} };

const reducer = (state: scriptsState = initialState, action: AnyAction) => {
  const typedAction = action as scriptsAction;
  switch (typedAction.type) {
    case getType(fetchScriptsSuccess):
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
