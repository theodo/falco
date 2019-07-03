import { AnyAction } from "redux";
import { ActionType } from "typesafe-actions";
import { ScriptType } from "./types";


export type ScriptsAction = ActionType<never>;

export type ScriptsState = Readonly<{
    byId: Readonly<Record<string, ScriptType>> | null;
}>;

const initialState: ScriptsState = {
    byId: null,
}

const reducer = (state: ScriptsState = initialState, action: AnyAction) => {
    // const typedAction = action as PagesAction;

    return state;
};

export default reducer;
