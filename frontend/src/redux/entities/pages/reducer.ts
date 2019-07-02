import { AnyAction } from "redux";
import { ActionType } from "typesafe-actions";
import { PageType } from "./types";


export type PagesAction = ActionType<never>;

export type PagesState = Readonly<{
    byId: Readonly<Record<string, PageType>> | null;
}>;

const initialState: PagesState = {
    byId: null,
}

const reducer = (state: PagesState = initialState, action: AnyAction) => {
    // const typedAction = action as PagesAction;

    return state;
};

export default reducer;
