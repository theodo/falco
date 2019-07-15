import { RootState } from 'redux/types';

export const getPageOrScriptRunningAuditId = (
  state: RootState,
  pageOrScriptId: string,
): string | null | undefined => {
  return state.entities.audits.runningAuditByPageOrScriptId[pageOrScriptId];
};
