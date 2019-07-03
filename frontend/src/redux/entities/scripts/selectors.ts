import { RootState } from "redux/types";
import { ScriptType } from "./types";


export const getScript = (state: RootState, scriptId: string): ScriptType | null => {
    return state.entities.scripts.byId && state.entities.scripts.byId[scriptId]
}
