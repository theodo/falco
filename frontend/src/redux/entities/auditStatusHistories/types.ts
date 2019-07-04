export type StatusType = "SUCCESS" | "REQUESTED" | "PENDING" | "ERROR";

export interface AuditStatusHistoryType {
    createdAt: string;
    status: StatusType;
    details: string;
    auditParametersId: string;
};

export interface ApiAuditStatusHistoryType {
    created_at: string;
    status: StatusType;
    details: string;
    parameters: string;
};
