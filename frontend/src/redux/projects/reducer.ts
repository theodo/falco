import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { fetchProjectError, fetchProjectsRequest, fetchProjectSuccess } from './actions';
import { ProjectType } from './types';

export type projectsAction = ActionType<typeof fetchProjectsRequest | typeof fetchProjectSuccess | typeof fetchProjectError>;

export type projectsState = Readonly<{
  byId: Readonly<Record<string, ProjectType>> | null;
}>;

const initialState: projectsState = { byId: null };

const reducer = (state: projectsState = initialState, action: AnyAction) => {
  const typedAction = action as projectsAction;
  switch (typedAction.type) {
    case getType(fetchProjectsRequest):
      return {
        ...state,
        byId: null,
      };
    case getType(fetchProjectSuccess):
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.payload.byId,
        },
      };
    case getType(fetchProjectError):
      return {
        ...state,
        byId: {
          ...state.byId,
          ...{[action.payload.projectId]: null},
        },
      };
    default:
      return state;
  }
};

export default reducer;
