import { getCurrentAuditParametersId } from 'redux/parameters/selectors';
import { RootState } from 'redux/types';
import { AuditStatusHistoryType } from '../auditStatusHistories/types';
import { ScriptType } from './types';

export const getScript = (state: RootState, scriptId: string): ScriptType | null | undefined => {
  return state.entities.scripts.byId ? state.entities.scripts.byId[scriptId] : undefined;
};

export const getScriptLatestAuditStatusHistory = (
  state: RootState,
  scriptId: string,
): AuditStatusHistoryType | undefined | null => {
  const auditParametersId = getCurrentAuditParametersId(state);
  if (!auditParametersId) {
    return null;
  }

  return state.entities.auditStatusHistories.byPageOrScriptIdAndAuditParametersId
    ? state.entities.auditStatusHistories.byPageOrScriptIdAndAuditParametersId[scriptId]
      ? state.entities.auditStatusHistories.byPageOrScriptIdAndAuditParametersId[scriptId][
          auditParametersId
        ]
      : null || null
    : null;
};
