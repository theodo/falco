import { AnyAction } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { fetchAuditStatusHistoriesAction } from "./actions";
import { AuditStatusHistoryType } from "./types";


export type AuditStatusHistoriesAction = ActionType<typeof fetchAuditStatusHistoriesAction>;

export type AuditStatusHistoriesState = Readonly<{
    byId: Readonly<Record<string, AuditStatusHistoryType>> | null;
    byPageOrScriptIdAndAuditParametersId: Readonly<Record<string, string>> | null;
}>;

const initialState: AuditStatusHistoriesState = {
    byId: null,
    byPageOrScriptIdAndAuditParametersId: null,
};

const reducer = (state: AuditStatusHistoriesState = initialState, action: AnyAction) => {
    const typedAction = action as AuditStatusHistoriesAction;
    switch (typedAction.type) {
        case getType(fetchAuditStatusHistoriesAction.success):
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...typedAction.payload.byId,
                },
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
