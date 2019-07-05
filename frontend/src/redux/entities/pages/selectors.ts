import { getCurrentAuditParametersId } from "redux/parameters/selectors";
import { RootState } from "redux/types";
import { getAuditStatusHistory } from "../auditStatusHistories/selectors";
import { AuditStatusHistoryType } from "../auditStatusHistories/types";
import { PageType } from "./types";


export const getPage = (state: RootState, pageId: string): PageType | null | undefined => {
    return state.entities.pages.byId ? state.entities.pages.byId[pageId] : undefined;
};

export const getPageLatestAuditStatusHistory = (state: RootState, pageId: string): AuditStatusHistoryType | undefined | null => {
    const page = getPage(state, pageId);
    const auditParametersId = getCurrentAuditParametersId(state);
    if (!page) {
        return null;
    };
    return page.latestAuditStatusHistoriesIds
        .map(auditStatusHistoryId => getAuditStatusHistory(state, auditStatusHistoryId))
        .find(
            auditStatusHistory => Boolean(auditStatusHistory && auditStatusHistory.auditParametersId === auditParametersId)
        );
};
