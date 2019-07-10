import { AnyAction } from "redux";
import { ActionType } from "typesafe-actions";
import { launchAuditAction, pollAuditStatusAction, stopPollingAuditStatusAction } from "./actions";
import { AuditTypeAndId } from "./types";


export type AuditsAction = ActionType<
    | typeof launchAuditAction
    | typeof pollAuditStatusAction
    | typeof stopPollingAuditStatusAction
>;

export type AuditsState = Readonly<{
    byId: Readonly<Record<string, AuditTypeAndId>> | null;
}>;

const initialState: AuditsState = {
    byId: null,
};

const reducer = (state: AuditsState = initialState, action: AnyAction) => {
    const typedAction = action as AuditsAction;
    switch (typedAction.type) {
        default:
            return state;
    };
};

export default reducer;
