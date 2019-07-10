export type StatusType = "SUCCESS" | "REQUESTED" | "PENDING" | "ERROR";

export interface AuditStatusHistoryType {
    uuid: string;
    createdAt: string;
    status: StatusType;
    details: string;
    auditParametersId: string;
    auditId: string;
    pageId: string | null;
    scriptId: string | null;
};

export interface ApiAuditStatusHistoryType {
    uuid: string;
    created_at: string;
    status: StatusType;
    details: string;
    parameters_id: string;
    page_id: string;
    script_id: string;
    audit_id: string;
};
