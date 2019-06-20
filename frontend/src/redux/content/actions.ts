import { createAsyncAction } from 'typesafe-actions';


export const fetchLastUpdateOfWhatsNew = createAsyncAction(
    'Content/FETCH_LAST_UPDATE_WHATSNEW_REQUEST',
    'Content/FETCH_LAST_UPDATE_WHATSNEW_SUCCESS',
    'Content/FETCH_LAST_UPDATE_WHATSNEW_FAILURE',
)<null, { lastUpdateNewsLetter: string | null }, { errorMessage: string }>();


export default {
    fetchLastUpdateOfWhatsNew,
};
