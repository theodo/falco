import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { fetchProjectError, fetchProjectsRequest, fetchProjectSuccess } from './actions';
import { ProjectType } from './types';

export type ProjectsAction = ActionType<typeof fetchProjectsRequest | typeof fetchProjectSuccess | typeof fetchProjectError>;

export type ProjectsState = Readonly<{
  byId: Readonly<Record<string, ProjectType>> | null;
}>;

const initialState: ProjectsState = { byId: null };

const reducer = (state: ProjectsState = initialState, action: AnyAction) => {
  const typedAction = action as ProjectsAction;
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
          ...typedAction.payload.byId,
        },
      };
    case getType(fetchProjectError):
      return {
        ...state,
        byId: {
          ...state.byId,
          ...(
            typedAction.payload.projectId && { [typedAction.payload.projectId]: null }
          ),
        },
      };
    default:
      return state;
  }
};

export default reducer;
