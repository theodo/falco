import { ApiAuditStatusHistoryType, AuditStatusHistoryType } from "./types";

export const modelizeAuditStatusHistory = (auditStatusHistory: ApiAuditStatusHistoryType): AuditStatusHistoryType => {
    return {
        uuid: auditStatusHistory.uuid,
        createdAt: auditStatusHistory.created_at,
        status: auditStatusHistory.status,
        details: auditStatusHistory.details,
        auditParametersId: auditStatusHistory.parameters
    };
};

export const modelizeApiAuditStatusHistoriesToById = (apiAuditStatusHistories: ApiAuditStatusHistoryType[]): Record<string, AuditStatusHistoryType> => {
    return apiAuditStatusHistories.reduce((auditStatusHistoriesById, apiAuditStatusHistory) => ({
        ...auditStatusHistoriesById,
        [apiAuditStatusHistory.uuid]: modelizeAuditStatusHistory(apiAuditStatusHistory),
    }), {});
};
