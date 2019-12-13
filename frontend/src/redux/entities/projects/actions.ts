import { createStandardAction } from 'typesafe-actions';

import { AuditParametersType } from '../auditParameters/types';
import { PageType } from '../pages/types';
import { ApiProjectType, ProjectToastrDisplayType, ProjectType } from './types';

export const fetchProjectsRequest = createStandardAction('projects/FETCH_PROJECTS_REQUEST')<{
  currentProjectId?: string;
}>();
export const saveFetchedProjects = createStandardAction('projects/SAVE_FETCHED_PROJECTS')<{
  projects: ApiProjectType[];
}>();
export const fetchProjectRequest = createStandardAction('projects/FETCH_PROJECT_REQUEST')<{
  projectId: string;
}>();
export const addPageToProjectRequest = createStandardAction('projects/ADD_PAGE_TO_PROJECT_REQUEST')<{
  projectId: string;
  pageName: string;
  pageUrl: string;
}>();
export const deletePageOfProjectRequest = createStandardAction('projects/DELETE_PAGE_OF_PROJECT_REQUEST')<{
  projectId: string;
  pageId: string;
}>();
export const deletePageOfProjectSuccess = createStandardAction('projects/DELETE_PAGE_OF_PROJECT_SUCCESS')<{
  projectId: string;
  pageId: string;
}>();
export const addMemberToProjectRequest = createStandardAction('projects/ADD_MEMBER_TO_PROJECT_REQUEST')<{
  projectId: string;
  userId: string;
}>();
export const deleteMemberOfProjectRequest = createStandardAction('projects/DELETE_MEMBER_OF_PROJECT_REQUEST')<{
  projectId: string;
  userId: string;
}>();
export const deleteMemberOfProjectSuccess = createStandardAction('projects/DELETE_MEMBER_OF_PROJECT_SUCCESS')<{
  projectId: string;
  userId: string;
}>();
export const editMemberOfProjectRequest = createStandardAction('projects/EDIT_MEMBER_OF_PROJECT_REQUEST')<{
  projectId: string;
  userId: string;
  isAdmin: boolean;
}>();
export const editMemberOfProjectSuccess = createStandardAction('projects/EDIT_MEMBER_OF_PROJECT_SUCCESS')<{
  projectId: string;
  userId: string;
  isAdmin: boolean;
}>();
export const addMemberToProjectSuccess = createStandardAction('projects/ADD_MEMBER_TO_PROJECT_SUCCESS')<{
  byId: Record<string, ProjectType>;
}>();
export const addPageToProjectSuccess = createStandardAction('projects/ADD_PAGE_TO_PROJECT_SUCCESS')<{
  projectId: string;
  page: PageType;
}>();
export const fetchProjectSuccess = createStandardAction('projects/FETCH_PROJECT_SUCCESS')<{
  byId: Record<string, ProjectType>;
}>();
export const fetchProjectError = createStandardAction('projects/FETCH_PROJECT_ERROR')<{
  projectId: string | null;
  errorMessage: string;
}>();
export const addMemberToProjectError = createStandardAction('projects/ADD_MEMBER_TO_PROJECT_ERROR')<{
  projectId: string | null;
  errorMessage: string;
}>();
export const addPageToProjectError = createStandardAction('projects/ADD_PAGE_TO_PROJECT_ERROR')<{
  projectId: string | null;
  errorMessage: string;
}>();
export const deleteMemberOfProjectError = createStandardAction('projects/DELETE_MEMBER_OF_PROJECT_ERROR')<{
  projectId: string | null;
  userId: string | null;
  errorMessage: string;
}>();
export const deletePageOfProjectError = createStandardAction('projects/DELETE_PAGE_OF_PROJECT_ERROR')<{
  projectId: string | null;
  pageId: string | null;
  errorMessage: string;
}>();
export const editMemberOfProjectError = createStandardAction('projects/DELETE_MEMBER_OF_PROJECT_ERROR')<{
  projectId: string | null;
  userId: string | null;
  errorMessage: string;
}>();
export const setProjectToastrDisplay = createStandardAction('projects/SET_TOASTR_DISPLAY')<{
  toastrDisplay: ProjectToastrDisplayType;
}>();
export const editProjectDetailsRequest = createStandardAction('projects/EDIT_PROJECT_DETAILS_REQUEST')<{
  projectId: string;
  payload: { name: string, wpt_api_key: string, wpt_instance_url: string };
}>();
export const editProjectDetailsError = createStandardAction('projects/EDIT_PROJECT_DETAILS_ERROR')<{
  projectId: string | null;
  errorMessage: string;
}>();
export const editProjectDetailsSuccess = createStandardAction('projects/EDIT_PROJECT_DETAILS_SUCCESS')<{
  byId: Record<string, ProjectType>;
}>();
export const addAuditParameterToProjectRequest = createStandardAction('projects/ADD_AUDIT_PARAMETER_TO_PROJECT_REQUEST')<{
  projectId: string;
  auditParameterName: string;
  auditParameterNetworkShape: string;
  auditParameterConfigurationId: string;
}>();
export const addAuditParameter = createStandardAction('projects/ADD_AUDIT_PARAMETER')<{
  byId: Record<string, AuditParametersType>;
}>();
export const addAuditParameterToProjectSuccess = createStandardAction('projects/ADD_AUDIT_PARAMETER_TO_PROJECT_SUCCESS')<{
  projectId: string;
  auditParameter: AuditParametersType;
}>();
export const addAuditParameterToProjectError = createStandardAction('projects/ADD_AUDIT_PARAMETER_TO_PROJECT_ERROR')<{
  projectId: string;
  errorMessage: string;
}>();
export const deleteAuditParameterFromProjectRequest = createStandardAction('projects/DELETE_AUDIT_PARAMETER_TO_PROJECT_REQUEST')<{
  projectId: string;
  auditParameterId: string;
}>();
export const deleteAuditParameterFromProjectSuccess = createStandardAction('projects/DELETE_AUDIT_PARAMETER_TO_PROJECT_SUCCESS')<{
  projectId: string;
  auditParameterId: string;
}>();
export const deleteAuditParameterFromProjectError = createStandardAction('projects/DELETE_AUDIT_PARAMETER_TO_PROJECT_ERROR')<{
  projectId: string;
  errorMessage: string;
}>();
export const addScriptToProjectSuccess = createStandardAction('projects/ADD_SCRIPT_TO_PROJECT_SUCCESS')<{
  projectId: string;
  scriptId: string;
}>();
export const deleteScriptFromProjectSuccess = createStandardAction('projects/DELETE_SCRIPT_FROM_PROJECT_SUCCESS')<{
  projectId: string;
  scriptId: string;
}>();

export default {
  addMemberToProjectRequest,
  addMemberToProjectError,
  addPageToProjectRequest,
  addPageToProjectError,
  deletePageOfProjectRequest,
  deletePageOfProjectSuccess,
  deletePageOfProjectError,
  deleteMemberOfProjectRequest,
  deleteMemberOfProjectSuccess,
  deleteMemberOfProjectError,
  editMemberOfProjectRequest,
  editMemberOfProjectSuccess,
  editMemberOfProjectError,
  fetchProjectRequest,
  fetchProjectsRequest,
  fetchProjectSuccess,
  fetchProjectError,
  setProjectToastrDisplay,
  editProjectDetailsRequest,
  editProjectDetailsError,
  editProjectDetailsSuccess,
  addAuditParameterToProjectRequest,
  addAuditParameterToProjectSuccess,
  addAuditParameter,
  deleteAuditParameterFromProjectRequest,
  deleteAuditParameterFromProjectError,
  deleteAuditParameterFromProjectSuccess,
  addScriptToProjectSuccess,
  deleteScriptFromProjectSuccess,
};
