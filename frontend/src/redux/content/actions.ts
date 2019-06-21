import { createAsyncAction, createStandardAction } from 'typesafe-actions';


export const fetchLastUpdateOfWhatsNew = createAsyncAction(
    'Content/FETCH_LAST_UPDATE_WHATSNEW_REQUEST',
    'Content/FETCH_LAST_UPDATE_WHATSNEW_SUCCESS',
    'Content/FETCH_LAST_UPDATE_WHATSNEW_FAILURE',
)<{}, { lastUpdateNewsLetter: string | null }, { errorMessage: string }>();


export const registerClickOnWhatsNew = createStandardAction(
    'Content/REGISTER_CLICK_ON_WHATSNEW',
)<{ lastClickOnWhatsNew: string | null }>();

export default {
    fetchLastUpdateOfWhatsNew,
    registerClickOnWhatsNew,
};
