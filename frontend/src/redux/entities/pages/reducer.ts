import { AnyAction } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { fetchPageAction } from "./actions";
import { PageType } from "./types";


export type PagesAction = ActionType<typeof fetchPageAction>;

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
        default:
            return state;
    }
};

export default reducer;
