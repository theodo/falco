import { createAsyncAction } from "typesafe-actions";
import { ScriptType } from "./types";

export const fetchScriptAction = createAsyncAction(
    'scripts/FETCH_SCRIPT_REQUEST',
    'scripts/FETCH_SCRIPT_SUCCESS',
    'scripts/FETCH_SCRIPT_FAILURE',
)<{}, { byId: Record<string, ScriptType>; }, { errorMessage: string }>();

export default {
    fetchScriptAction,
}
