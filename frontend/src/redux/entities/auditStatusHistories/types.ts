export type StatusType = "SUCCESS" | "REQUESTED" | "PENDING" | "ERROR";

export interface AuditStatusHistoryType {
    uuid: string;
    createdAt: string;
    status: StatusType;
    details: string;
    auditParametersId: string;
};

export interface ApiAuditStatusHistoryType {
    uuid: string;
    created_at: string;
    status: StatusType;
    details: string;
    parameters: string;
};
