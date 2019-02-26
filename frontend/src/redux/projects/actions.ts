import { createStandardAction } from 'typesafe-actions';

export const fetchProjectRequest = createStandardAction('projects/FETCH_PROJECT_REQUEST')<{
  projectId: string;
}>();
export const fetchProjectSuccess = createStandardAction('projects/FETCH_PROJECT_SUCCESS')<{
  token: string;
}>();
export const fetchProjectError = createStandardAction('projects/FETCH_PROJECT_ERROR')<{
  errorMessage: string;
}>();

export default {
  fetchProjectRequest,
  fetchProjectSuccess,
  fetchProjectError,
};
