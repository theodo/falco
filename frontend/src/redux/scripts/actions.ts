import { createStandardAction } from 'typesafe-actions';

import { ScriptType } from './types';

export const fetchScriptsSuccess = createStandardAction('scripts/FETCH_SCRIPTS_SUCCESS')<{
  byId: Record<string, ScriptType>;
}>();

export default {
  fetchScriptsSuccess,
};
