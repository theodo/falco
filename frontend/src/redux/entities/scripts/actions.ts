import { createAsyncAction } from "typesafe-actions";
import { ScriptType } from "./types";

export const fetchScriptAction = createAsyncAction(
    'Entities/Scripts/FETCH_SCRIPT_REQUEST',
    'Entities/Scripts/FETCH_SCRIPT_SUCCESS',
    'Entities/Scripts/FETCH_SCRIPT_FAILURE',
)<{}, { byId: Record<string, ScriptType>; }, { errorMessage: string }>();

export default {
    fetchScriptAction,
}
