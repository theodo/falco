import { ApiAuditStatusHistoryType, AuditStatusHistoryType } from "../projects/types";

export interface PageType {
    name: string;
    url: string;
    uuid: string;
    latestAuditStatusHistories: AuditStatusHistoryType[];
}

export interface ApiPageType {
    name: string;
    url: string;
    uuid: string;
    latest_audit_status_histories: ApiAuditStatusHistoryType[];
}