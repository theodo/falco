import { createAsyncAction } from "typesafe-actions";
import { PageType } from "./types";


export const fetchPageAction = createAsyncAction(
    'pages/FETCH_PAGE_REQUEST',
    'pages/FETCH_PAGE_SUCCESS',
    'pages/FETCH_PAGE_FAILURE',
)<{}, { byId: Record<string, PageType>; }, { errorMessage: string }>();

export default {
    fetchPageAction,
}
