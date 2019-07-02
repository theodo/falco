import { modelizeAuditStatusHistory } from "redux/auditResults/modelizer";
import { ApiPageType, PageType } from "./types";


export const modelizePage = (apiPage: ApiPageType): PageType => ({
    uuid: apiPage.uuid,
    url: apiPage.url,
    name: apiPage.name,
    latestAuditStatusHistories: apiPage.latest_audit_status_histories.map(modelizeAuditStatusHistory),
})

// should be deleted once the refacto is complete
export const modelizePagesToById = (pages: PageType[]): Record<string, PageType> => {
    return pages.reduce((pagesById, page) => {
        return {
            ...pagesById,
            [page.uuid]: {
                uuid: page.uuid,
                name: page.name,
                url: page.url,
            },
        };
    }, {});
};

export const modelizeApiPagesToById = (pages: ApiPageType[]): Record<string, PageType> => {
    return pages.reduce((pagesById, page) => {
        return {
            ...pagesById,
            [page.uuid]: modelizePage(page),
        };
    }, {});
};