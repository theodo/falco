import { createStandardAction } from 'typesafe-actions';

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
  project: ProjectType;
}>();
export const editProjectDetailsError = createStandardAction('projects/EDIT_PROJECT_DETAILS_ERROR')<{
  projectId: string | null;
  errorMessage: string;
}>();
export const editProjectDetailsSuccess = createStandardAction('projects/EDIT_PROJECT_DETAILS_SUCCESS')<{
  byId: Record<string, ProjectType>;
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
};
