import { AnyAction } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { editPageError, editPageSuccess, fetchPageAction } from "./actions";
import { PageType } from "./types";


export type PagesAction = ActionType<
    typeof fetchPageAction |
    typeof editPageSuccess |
    typeof editPageError
>;

export type PagesState = Readonly<{
    byId: Readonly<Record<string, PageType>> | null;
}>;

const initialState: PagesState = {
    byId: null,
}

const reducer = (state: PagesState = initialState, action: AnyAction) => {
    const typedAction = action as PagesAction;
    switch (typedAction.type) {
        case getType(fetchPageAction.success):
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...typedAction.payload.byId,
                }
            };
        case getType(editPageSuccess):
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [typedAction.payload.page.uuid]: typedAction.payload.page,
                }
            };
        case getType(editPageError):
            if(!state.byId) {
                return state;
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [typedAction.payload.page.uuid]: { ...state.byId[typedAction.payload.page.uuid] },
                }
            };
        default:
            return state;
    }
};

export default reducer;
