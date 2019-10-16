import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import {
  addAuditParameterToProjectSuccess,
  addMemberToProjectSuccess,
  addPageToProjectSuccess,
  addScriptToProjectSuccess,
  deleteAuditParameterFromProjectSuccess,
  deleteMemberOfProjectSuccess,
  deletePageOfProjectSuccess,
  deleteScriptFromProjectSuccess,
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
  typeof editProjectDetailsSuccess |
  typeof addAuditParameterToProjectSuccess |
  typeof deleteAuditParameterFromProjectSuccess |
  typeof addScriptToProjectSuccess |
  typeof deleteScriptFromProjectSuccess
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

const getAllAuditParametersIdsExceptTargetAuditParameterId = (project: ProjectType, targetAuditParameterId: string) => {
  return project.auditParametersIds.filter((auditParameterId: string) => {
    return auditParameterId !== targetAuditParameterId;
  });
}

const getAllScriptsIdsExceptTargetScriptId = (project: ProjectType, targetScriptId: string) => {
  return project.scriptsIds.filter((scriptId: string) => {
    return scriptId !== targetScriptId;
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
     case getType(addAuditParameterToProjectSuccess):
        if(!state.byId) { return state };

        return {
        ...state,
        byId: {
          ...state.byId,
          [typedAction.payload.projectId]: {
            ...state.byId[typedAction.payload.projectId],
            auditParametersIds: [...state.byId[typedAction.payload.projectId].auditParametersIds, typedAction.payload.auditParameter.uuid]
          }
        },
      };
    case getType(deleteAuditParameterFromProjectSuccess):
      if(!state.byId) { return state };

      return {
        ...state,
        byId: {
          ...state.byId,
          [typedAction.payload.projectId]: {
            ...state.byId[typedAction.payload.projectId],
            auditParametersIds: getAllAuditParametersIdsExceptTargetAuditParameterId(state.byId[typedAction.payload.projectId], typedAction.payload.auditParameterId),
          }
        },
      };
    case getType(addScriptToProjectSuccess):
      if(!state.byId) { return state };

      return {
      ...state,
      byId: {
        ...state.byId,
        [typedAction.payload.projectId]: {
          ...state.byId[typedAction.payload.projectId],
          scriptsIds: [...state.byId[typedAction.payload.projectId].scriptsIds, typedAction.payload.scriptId]
        }
      },
    };
    case getType(deleteScriptFromProjectSuccess):
        if(!state.byId) { return state };

        return {
          ...state,
          byId: {
            ...state.byId,
            [typedAction.payload.projectId]: {
              ...state.byId[typedAction.payload.projectId],
              scriptsIds: getAllScriptsIdsExceptTargetScriptId(state.byId[typedAction.payload.projectId], typedAction.payload.scriptId),
            }
          },
        };
    default:
      return state;
  }
};

export default reducer;
