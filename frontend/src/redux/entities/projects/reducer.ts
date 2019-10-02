import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import {
  addMemberToProjectSuccess,
  addPageToProjectSuccess,
  deleteMemberOfProjectSuccess,
  deletePageOfProjectSuccess,
  editMemberOfProjectSuccess,
  editProjectDetailsSuccess,
  fetchProjectError,
  fetchProjectsRequest,
  fetchProjectSuccess,
  setProjectToastrDisplay,
} from './actions';
import { ProjectMember, ProjectToastrDisplayType, ProjectType } from './types';

export type ProjectsAction = ActionType<
  typeof fetchProjectsRequest |
  typeof addMemberToProjectSuccess |
  typeof addPageToProjectSuccess |
  typeof deleteMemberOfProjectSuccess |
  typeof deletePageOfProjectSuccess |
  typeof editMemberOfProjectSuccess |
  typeof fetchProjectSuccess |
  typeof fetchProjectError |
  typeof setProjectToastrDisplay |
  typeof editProjectDetailsSuccess
>;

export type ProjectsState = Readonly<{
  toastrDisplay: ProjectToastrDisplayType
  byId: Readonly<Record<string, ProjectType>> | null;
}>;

const initialState: ProjectsState = { toastrDisplay: '', byId: null };

const getAllPagesIdsExceptTargetPageId = (project: ProjectType, targetPageId: string) => {
  return project.pagesIds.filter((pageId: string) => {
    return pageId !== targetPageId;
  });
}

const getAllMembersExceptTargetMember = (project: ProjectType, targetMemberId: string) => {
  return project.projectMembers.filter((member: ProjectMember) => {
    return member.id !== targetMemberId;
  });
}

const getAllMembersWithUpdatedAdminStatusForTargetMember = (project: ProjectType, targetMemberId: string, isAdmin: boolean) => {
  return project.projectMembers.map((member: ProjectMember) => {
    if(member.id !== targetMemberId) {
      return member;
    };

    return {...member, isAdmin}
  });
}

const reducer = (state: ProjectsState = initialState, action: AnyAction) => {
  const typedAction = action as ProjectsAction;
  switch (typedAction.type) {
    case getType(setProjectToastrDisplay):
      return {
        ...state,
        toastrDisplay: typedAction.payload.toastrDisplay,
      };
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
    case getType(addPageToProjectSuccess):
      if(!state.byId) { return state };

      return {
        ...state,
        byId: {
          ...state.byId,
          [typedAction.payload.projectId]: {
            ...state.byId[typedAction.payload.projectId],
            pagesIds: [...state.byId[typedAction.payload.projectId].pagesIds, typedAction.payload.page.uuid]
          }
        },
      };
    case getType(deletePageOfProjectSuccess):
      if(!state.byId) { return state };

      return {
        ...state,
        byId: {
          ...state.byId,
          [typedAction.payload.projectId]: {
            ...state.byId[typedAction.payload.projectId],
            pagesIds: getAllPagesIdsExceptTargetPageId(state.byId[typedAction.payload.projectId], typedAction.payload.pageId),
          }
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
            projectMembers: getAllMembersExceptTargetMember(state.byId[typedAction.payload.projectId], typedAction.payload.userId),
          }
        },
      };
      case getType(editMemberOfProjectSuccess):
        if(!state.byId) { return state };
  
        const updatedMembers = getAllMembersWithUpdatedAdminStatusForTargetMember(
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
              projectMembers: updatedMembers
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
    case getType(editProjectDetailsSuccess):
      return {
        ...state,
        byId: {
          ...state.byId,
          ...typedAction.payload.byId,
        },
      };
    default:
      return state;
  }
};

export default reducer;
