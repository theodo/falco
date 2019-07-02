import { createAsyncAction } from "typesafe-actions";
import { PageType } from "./types";


export const fetchPageAction = createAsyncAction(
    'Entities/Pages/FETCH_PAGE_REQUEST',
    'Entities/Pages/FETCH_PAGE_SUCCESS',
    'Entities/Pages/FETCH_PAGE_FAILURE',
)<{}, { byId: Record<string, PageType>; }, { errorMessage: string }>();

export default {
    fetchPageAction,
}
