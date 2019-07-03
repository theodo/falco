import { RootState } from "redux/types";
import { ScriptType } from "./types";


export const getScript = (state: RootState, scriptId: string): ScriptType | null | undefined => {
    return state.entities.scripts.byId ? state.entities.scripts.byId[scriptId] : undefined;
}
