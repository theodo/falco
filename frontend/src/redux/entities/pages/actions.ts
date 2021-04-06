import { createAction, createAsyncAction } from 'typesafe-actions';
import { PageType } from './types';

export const editPageRequest = createAction('pages/EDIT_PAGE_REQUEST')<{
  projectId: string;
  page: PageType;
}>();
export const editPageSuccess = createAction('pages/EDIT_PAGE_SUCCESS')<{
  page: PageType;
}>();
export const editPageError = createAction('pages/EDIT_PAGE_ERROR')<{
  projectId: string;
  page: PageType;
}>();

export const fetchPageAction = createAsyncAction(
  'pages/FETCH_PAGE_REQUEST',
  'pages/FETCH_PAGE_SUCCESS',
  'pages/FETCH_PAGE_FAILURE',
)<never, { byId: Record<string, PageType> }, { errorMessage: string }>();
