import { ApiPageType, PageType } from "./types";


const modelizePage = (apiPage: ApiPageType): PageType => ({
    uuid: apiPage.uuid,
    url: apiPage.url,
    name: apiPage.name,
    latestAuditStatusHistoriesIds: apiPage.latest_audit_status_histories.map(apiAuditStatusHistory => apiAuditStatusHistory.uuid),
});

export const modelizeApiPagesToById = (pages: ApiPageType[]): Record<string, PageType> => {
    return pages.reduce((pagesById, page) => {
        return {
            ...pagesById,
            [page.uuid]: modelizePage(page),
        };
    }, {});
};
