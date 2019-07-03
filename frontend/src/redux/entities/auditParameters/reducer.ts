import { AnyAction } from "redux";
import { ActionType } from "typesafe-actions";
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
    // const typedAction = action as AuditParametersAction;
    return state;
};

export default reducer;
