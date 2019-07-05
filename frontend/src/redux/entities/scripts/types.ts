import { ApiAuditStatusHistoryType } from "../auditStatusHistories/types";

export interface ScriptType {
    uuid: string;
    name: string;
    latestAuditStatusHistoriesIds: string[];
};

export interface ApiScriptType {
    uuid: string;
    name: string;
    latest_audit_status_histories: ApiAuditStatusHistoryType[];
};
