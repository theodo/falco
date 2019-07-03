import { AnyAction } from "redux";
import { ActionType } from "typesafe-actions";
import { fetchScriptAction } from "./actions";
import { ScriptType } from "./types";


export type ScriptsAction = ActionType<typeof fetchScriptAction>;

export type ScriptsState = Readonly<{
    byId: Readonly<Record<string, ScriptType>> | null;
}>;

const initialState: ScriptsState = {
    byId: null,
}

const reducer = (state: ScriptsState = initialState, action: AnyAction) => {
    // const typedAction = action as ScriptsAction;

    return state;
};

export default reducer;
