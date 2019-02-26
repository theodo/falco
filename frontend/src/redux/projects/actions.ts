import { createStandardAction } from 'typesafe-actions';
import { ProjectType } from './types';

export const fetchProjectRequest = createStandardAction('projects/FETCH_PROJECT_REQUEST')<{
  projectId: string;
}>();
export const fetchProjectSuccess = createStandardAction('projects/FETCH_PROJECT_SUCCESS')<{
  byId: Record<string, ProjectType>;
}>();
export const fetchProjectError = createStandardAction('projects/FETCH_PROJECT_ERROR')<{
  errorMessage: string;
}>();

export default {
  fetchProjectRequest,
  fetchProjectSuccess,
  fetchProjectError,
};
