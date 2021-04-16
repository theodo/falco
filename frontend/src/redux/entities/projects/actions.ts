import { createAction } from 'typesafe-actions';

import { AuditParametersType } from '../auditParameters/types';
import { PageType } from '../pages/types';
import { ApiProjectType, ProjectToastrDisplayType, ProjectType } from './types';

export const fetchProjectsRequest = createAction('projects/FETCH_PROJECTS_REQUEST')<{
  currentProjectId?: string;
}>();
export const saveFetchedProjects = createAction('projects/SAVE_FETCHED_PROJECTS')<{
  projects: ApiProjectType[];
}>();
export const fetchProjectRequest = createAction('projects/FETCH_PROJECT_REQUEST')<{
  projectId: string;
}>();
export const addPageToProjectRequest = createAction('projects/ADD_PAGE_TO_PROJECT_REQUEST')<{
  projectId: string;
  pageName: string;
  pageUrl: string;
}>();
export const deletePageOfProjectRequest = createAction('projects/DELETE_PAGE_OF_PROJECT_REQUEST')<{
  projectId: string;
  pageId: string;
}>();
export const deletePageOfProjectSuccess = createAction('projects/DELETE_PAGE_OF_PROJECT_SUCCESS')<{
  projectId: string;
  pageId: string;
}>();
export const addMemberToProjectRequest = createAction('projects/ADD_MEMBER_TO_PROJECT_REQUEST')<{
  projectId: string;
  userId: string;
}>();
export const deleteMemberOfProjectRequest = createAction(
  'projects/DELETE_MEMBER_OF_PROJECT_REQUEST',
)<{
  projectId: string;
  userId: string;
}>();
export const deleteMemberOfProjectSuccess = createAction(
  'projects/DELETE_MEMBER_OF_PROJECT_SUCCESS',
)<{
  projectId: string;
  userId: string;
}>();
export const editMemberOfProjectRequest = createAction('projects/EDIT_MEMBER_OF_PROJECT_REQUEST')<{
  projectId: string;
  userId: string;
  isAdmin: boolean;
}>();
export const editMemberOfProjectSuccess = createAction('projects/EDIT_MEMBER_OF_PROJECT_SUCCESS')<{
  projectId: string;
  userId: string;
  isAdmin: boolean;
}>();
export const addMemberToProjectSuccess = createAction('projects/ADD_MEMBER_TO_PROJECT_SUCCESS')<{
  byId: Record<string, ProjectType>;
}>();
export const addPageToProjectSuccess = createAction('projects/ADD_PAGE_TO_PROJECT_SUCCESS')<{
  projectId: string;
  page: PageType;
}>();
export const fetchProjectSuccess = createAction('projects/FETCH_PROJECT_SUCCESS')<{
  byId: Record<string, ProjectType>;
}>();
export const fetchProjectError = createAction('projects/FETCH_PROJECT_ERROR')<{
  projectId: string | null;
  errorMessage: string;
}>();
export const addMemberToProjectError = createAction('projects/ADD_MEMBER_TO_PROJECT_ERROR')<{
  projectId: string | null;
  errorMessage: string;
}>();
export const addPageToProjectError = createAction('projects/ADD_PAGE_TO_PROJECT_ERROR')<{
  projectId: string | null;
  errorMessage: string;
}>();
export const deleteMemberOfProjectError = createAction('projects/DELETE_MEMBER_OF_PROJECT_ERROR')<{
  projectId: string | null;
  userId: string | null;
  errorMessage: string;
}>();
export const deletePageOfProjectError = createAction('projects/DELETE_PAGE_OF_PROJECT_ERROR')<{
  projectId: string | null;
  pageId: string | null;
  errorMessage: string;
}>();
export const editMemberOfProjectError = createAction('projects/DELETE_MEMBER_OF_PROJECT_ERROR')<{
  projectId: string | null;
  userId: string | null;
  errorMessage: string;
}>();
export const setProjectToastrDisplay = createAction('projects/SET_TOASTR_DISPLAY')<{
  toastrDisplay: ProjectToastrDisplayType;
}>();
export const editProjectDetailsRequest = createAction('projects/EDIT_PROJECT_DETAILS_REQUEST')<{
  projectId: string;
  payload: { name: string; wpt_api_key: string; wpt_instance_url: string };
}>();
export const editProjectDetailsError = createAction('projects/EDIT_PROJECT_DETAILS_ERROR')<{
  projectId: string | null;
  errorMessage: string;
}>();
export const editProjectDetailsSuccess = createAction('projects/EDIT_PROJECT_DETAILS_SUCCESS')<{
  byId: Record<string, ProjectType>;
}>();
export const addAuditParameterToProjectRequest = createAction(
  'projects/ADD_AUDIT_PARAMETER_TO_PROJECT_REQUEST',
)<{
  projectId: string;
  auditParameterName: string;
  auditParameterNetworkShape: string;
  auditParameterConfigurationId: string;
}>();
export const addAuditParameter = createAction('projects/ADD_AUDIT_PARAMETER')<{
  byId: Record<string, AuditParametersType>;
}>();
export const addAuditParameterToProjectSuccess = createAction(
  'projects/ADD_AUDIT_PARAMETER_TO_PROJECT_SUCCESS',
)<{
  projectId: string;
  auditParameter: AuditParametersType;
}>();
export const addAuditParameterToProjectError = createAction(
  'projects/ADD_AUDIT_PARAMETER_TO_PROJECT_ERROR',
)<{
  projectId: string;
  errorMessage: string;
}>();
export const deleteAuditParameterFromProjectRequest = createAction(
  'projects/DELETE_AUDIT_PARAMETER_TO_PROJECT_REQUEST',
)<{
  projectId: string;
  auditParameterId: string;
}>();
export const deleteAuditParameterFromProjectSuccess = createAction(
  'projects/DELETE_AUDIT_PARAMETER_TO_PROJECT_SUCCESS',
)<{
  projectId: string;
  auditParameterId: string;
}>();
export const deleteAuditParameterFromProjectError = createAction(
  'projects/DELETE_AUDIT_PARAMETER_TO_PROJECT_ERROR',
)<{
  projectId: string;
  errorMessage: string;
}>();
export const addScriptToProjectSuccess = createAction('projects/ADD_SCRIPT_TO_PROJECT_SUCCESS')<{
  projectId: string;
  scriptId: string;
}>();
export const deleteScriptFromProjectSuccess = createAction(
  'projects/DELETE_SCRIPT_FROM_PROJECT_SUCCESS',
)<{
  projectId: string;
  scriptId: string;
}>();
