import { ApiAuditStatusHistoryType, AuditStatusHistoryType } from "../projects/types";

export interface ScriptType {
    uuid: string;
    name: string;
    latestAuditStatusHistories: AuditStatusHistoryType[];
}

export interface ApiScriptType {
    uuid: string;
    name: string;
    latest_audit_status_histories: ApiAuditStatusHistoryType[];
}
