import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { fetchProjectSuccess } from './actions';

export type projectsAction = ActionType<typeof fetchProjectSuccess>;

export type projectsState = Readonly<{
  byId: Object;
}>;

const initialState: projectsState = { byId: {} };

const reducer = (state: projectsState = initialState, action: AnyAction) => {
  const typedAction = action as projectsAction;
  switch (typedAction.type) {
    case getType(fetchProjectSuccess):
      return {
        ...state,
        token: typedAction.payload.token,
      };
    default:
      return state;
  }
};

export default reducer;
