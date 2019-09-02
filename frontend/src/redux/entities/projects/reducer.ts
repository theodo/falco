import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { addMemberToProjectSuccess, deleteMemberOfProjectSuccess, fetchProjectError, fetchProjectsRequest, fetchProjectSuccess } from './actions';
import { ProjectMember, ProjectType } from './types';

export type ProjectsAction = ActionType<
  typeof fetchProjectsRequest | 
  typeof addMemberToProjectSuccess | 
  typeof deleteMemberOfProjectSuccess |
  typeof fetchProjectSuccess | 
  typeof fetchProjectError
>;

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
    case getType(addMemberToProjectSuccess):
      return {
        ...state,
        byId: {
          ...state.byId,
          ...typedAction.payload.byId,
        },
      };
    case getType(deleteMemberOfProjectSuccess):
      if(!state.byId) { return state };

      const filteredMembers = state.byId[typedAction.payload.projectId].projectMembers.filter((member: ProjectMember) => {
        return member.id !== typedAction.payload.userId;
      });

      return {
        ...state,
        byId: {
          ...state.byId,
          [typedAction.payload.projectId]: {
            ...state.byId[typedAction.payload.projectId],
            projectMembers: filteredMembers
          }
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
