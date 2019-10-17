import { AnyAction } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { addScript, editScriptSuccess, fetchScriptAction } from "./actions";
import { ScriptType } from "./types";


export type ScriptsAction = ActionType<
typeof fetchScriptAction |
typeof addScript |
typeof editScriptSuccess
>;

export type ScriptsState = Readonly<{
    byId: Readonly<Record<string, ScriptType>> | null;
}>;

const initialState: ScriptsState = {
    byId: null,
}

const reducer = (state: ScriptsState = initialState, action: AnyAction) => {
    const typedAction = action as ScriptsAction;
    switch (typedAction.type) {
        case getType(fetchScriptAction.success):
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...typedAction.payload.byId,
                }
            };
        case getType(addScript):
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...typedAction.payload.byId,
            }
        };
        case getType(editScriptSuccess):
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
