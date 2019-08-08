export const auditStatus = {
    success: "SUCCESS",
    error: "ERROR",
    requested: "REQUESTED",
    pending: "PENDING",
    queuing: "QUEUEING",
    running: "RUNNING"
}

export type StatusType = "SUCCESS" | "REQUESTED" | "PENDING" | "QUEUEING" | "RUNNING" | "ERROR";

interface AuditStatusHistoryInfoType {
    completedTests: string;
    positionInQueue: string;
    runningTime: string;
    totalTests: string;
}

export interface AuditStatusHistoryType {
    uuid: string;
    createdAt: string;
    status: StatusType;
    details: string;
    auditParametersId: string;
    auditId: string;
    pageId: string | null;
    scriptId: string | null;
    info: AuditStatusHistoryInfoType | null
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
    info: string | null
};
