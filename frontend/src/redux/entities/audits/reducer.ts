import { AnyAction } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { launchAuditAction, pollAuditStatusAction, stopPollingAuditStatusAction } from "./actions";


export type AuditsAction = ActionType<
    | typeof launchAuditAction
    | typeof pollAuditStatusAction
    | typeof stopPollingAuditStatusAction
>;

export type AuditsState = Readonly<{
    runningAuditByPageOrScriptId: Readonly<Record<string, string | null>>;
}>;

const initialState: AuditsState = {
    runningAuditByPageOrScriptId: {},
};

const reducer = (state: AuditsState = initialState, action: AnyAction) => {
    const typedAction = action as AuditsAction;
    switch (typedAction.type) {
        case getType(pollAuditStatusAction):
            return {
                ...state,
                runningAuditByPageOrScriptId: {
                    ...state.runningAuditByPageOrScriptId,
                    [typedAction.payload.pageOrScriptId]: typedAction.payload.auditId,
                }
            };
        case getType(stopPollingAuditStatusAction):
            const lastAuditStatusHistory = typedAction.payload.lastAuditStatusHistory;
            return {
                ...state,
                runningAuditByPageOrScriptId: {
                    ...state.runningAuditByPageOrScriptId,
                    [lastAuditStatusHistory.pageId || lastAuditStatusHistory.scriptId || ""]: null,
                }
            }
        default:
            return state;
    };
};

export default reducer;
