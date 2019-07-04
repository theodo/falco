import { AnyAction } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { fetchAuditParametersAction } from "./actions";
import { AuditParametersType } from "./types";


export type AuditParametersAction = ActionType<typeof fetchAuditParametersAction>;

export type AuditParametersState = Readonly<{
    byId: Readonly<Record<string, AuditParametersType>> | null;
}>;

const initialState: AuditParametersState = {
    byId: null,
}

const reducer = (state: AuditParametersState = initialState, action: AnyAction) => {
    const typedAction = action as AuditParametersAction;
    switch (typedAction.type) {
        case getType(fetchAuditParametersAction.success):
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...typedAction.payload.byId,
                }
            };
        default:
            return state;
    }
};

export default reducer;
