import { AnyAction } from "redux";
import { ActionType } from "typesafe-actions";
import { fetchAuditStatusHistoriesAction } from "./actions";
import { AuditStatusHistoryType } from "./types";


export type AuditStatusHistoriesAction = ActionType<typeof fetchAuditStatusHistoriesAction>;

export type AuditStatusHistoriesState = Readonly<{
    byId: Readonly<Record<string, AuditStatusHistoryType>> | null;
}>;

const initialState: AuditStatusHistoriesState = {
    byId: null,
};

const reducer = (state: AuditStatusHistoriesState = initialState, action: AnyAction) => {
    // const typedAction = action as AuditStatusHistoriesAction;
    return state;
};

export default reducer;
