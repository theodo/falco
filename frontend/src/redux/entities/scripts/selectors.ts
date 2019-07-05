import { getCurrentAuditParametersId } from "redux/parameters/selectors";
import { RootState } from "redux/types";
import { getAuditStatusHistory } from "../auditStatusHistories/selectors";
import { AuditStatusHistoryType } from "../auditStatusHistories/types";
import { ScriptType } from "./types";


export const getScript = (state: RootState, scriptId: string): ScriptType | null | undefined => {
    return state.entities.scripts.byId ? state.entities.scripts.byId[scriptId] : undefined;
};

export const getScriptLatestAuditStatusHistory = (state: RootState, scriptId: string): AuditStatusHistoryType | undefined | null => {
    const script = getScript(state, scriptId);
    const auditParametersId = getCurrentAuditParametersId(state);
    if (!script) {
        return null;
    };
    return script.latestAuditStatusHistoriesIds
        .map(auditStatusHistoryId => getAuditStatusHistory(state, auditStatusHistoryId))
        .find(
            auditStatusHistory => Boolean(auditStatusHistory && auditStatusHistory.auditParametersId === auditParametersId)
        );
};
