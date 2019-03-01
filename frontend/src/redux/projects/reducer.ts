import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { fetchProjectSuccess } from './actions';
import { ProjectType } from './types';

export type projectsAction = ActionType<typeof fetchProjectSuccess>;

export type projectsState = Readonly<{
  byId: Readonly<Record<string, ProjectType>>;
}>;

const initialState: projectsState = { byId: {} };

const reducer = (state: projectsState = initialState, action: AnyAction) => {
  const typedAction = action as projectsAction;
  switch (typedAction.type) {
    case getType(fetchProjectSuccess):
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
