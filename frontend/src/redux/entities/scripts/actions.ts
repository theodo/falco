import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { ScriptType } from "./types";

export const fetchScriptAction = createAsyncAction(
    'scripts/FETCH_SCRIPT_REQUEST',
    'scripts/FETCH_SCRIPT_SUCCESS',
    'scripts/FETCH_SCRIPT_FAILURE',
)<{}, { byId: Record<string, ScriptType>; }, { errorMessage: string }>();

export const addScript = createStandardAction('projects/ADD_SCRIPT')<{
    byId: Record<string, ScriptType>;
  }>();

export default {
    fetchScriptAction,
    addScript,
}
