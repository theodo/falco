import { AnyAction } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { fetchAuditStatusHistoriesAction } from "./actions";
import { AuditStatusHistoryType } from "./types";


export type AuditStatusHistoriesAction = ActionType<typeof fetchAuditStatusHistoriesAction>;

export type AuditStatusHistoriesState = Readonly<{
    byPageOrScriptIdAndAuditParametersId: Readonly<Record<string, Record<string, AuditStatusHistoryType>>> | null;
}>;

const initialState: AuditStatusHistoriesState = {
    byPageOrScriptIdAndAuditParametersId: null,
};

const reducer = (state: AuditStatusHistoriesState = initialState, action: AnyAction) => {
    const typedAction = action as AuditStatusHistoriesAction;
    switch (typedAction.type) {
        case getType(fetchAuditStatusHistoriesAction.success):
            return {
                ...state,
                byPageOrScriptIdAndAuditParametersId: {
                    ...state.byPageOrScriptIdAndAuditParametersId,
                    ...typedAction.payload.byPageOrScriptIdAndAuditParametersId,
                },
            };
        default:
            return state;
    };
};

export default reducer;
