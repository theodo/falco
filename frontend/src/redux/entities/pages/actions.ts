import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { PageType } from "./types";

export const editPageRequest = createStandardAction('pages/EDIT_PAGE_REQUEST')<{
    projectId: string;
    page: PageType;
  }>();
  export const editPageSuccess = createStandardAction('pages/EDIT_PAGE_SUCCESS')<{
    page: PageType;
  }>();
  export const editPageError = createStandardAction('pages/EDIT_PAGE_ERROR')<{
    projectId: string;
    page: PageType;
  }>();

export const fetchPageAction = createAsyncAction(
    'pages/FETCH_PAGE_REQUEST',
    'pages/FETCH_PAGE_SUCCESS',
    'pages/FETCH_PAGE_FAILURE',
)<{}, { byId: Record<string, PageType>; }, { errorMessage: string }>();

export default {
    editPageRequest,
    editPageSuccess,
    editPageError,
    fetchPageAction,
}
