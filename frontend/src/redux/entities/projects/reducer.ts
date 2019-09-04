import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { addMemberToProjectSuccess, deleteMemberOfProjectSuccess, editMemberOfProjectSuccess, fetchProjectError, fetchProjectsRequest, fetchProjectSuccess } from './actions';
import { ProjectMember, ProjectType } from './types';

export type ProjectsAction = ActionType<
  typeof fetchProjectsRequest | 
  typeof addMemberToProjectSuccess | 
  typeof deleteMemberOfProjectSuccess |
  typeof editMemberOfProjectSuccess |
  typeof fetchProjectSuccess | 
  typeof fetchProjectError
>;

export type ProjectsState = Readonly<{
  byId: Readonly<Record<string, ProjectType>> | null;
}>;

const initialState: ProjectsState = { byId: null };

const getAllMembersExceptOne = (project: ProjectType, userId: string) => {
  return project.projectMembers.filter((member: ProjectMember) => {
    return member.id !== userId;
  });
}

const changeAdminStatusOfMember = (project: ProjectType, userId: string, isAdmin: boolean) => {
  return project.projectMembers.map((member: ProjectMember) => {
    if(member.id !== userId) {
      return member;
    };

    return {...member, isAdmin}
  });
}

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

      return {
        ...state,
        byId: {
          ...state.byId,
          [typedAction.payload.projectId]: {
            ...state.byId[typedAction.payload.projectId],
            projectMembers: getAllMembersExceptOne(state.byId[typedAction.payload.projectId], typedAction.payload.userId),
          }
        },
      };
      case getType(editMemberOfProjectSuccess):
        if(!state.byId) { return state };
  
        const filteredMembers = changeAdminStatusOfMember(
          state.byId[typedAction.payload.projectId],
          typedAction.payload.userId,
          typedAction.payload.isAdmin
        );

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
