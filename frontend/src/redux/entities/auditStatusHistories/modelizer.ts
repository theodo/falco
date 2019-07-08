import { ApiAuditStatusHistoryType, AuditStatusHistoryType } from "./types";

export const modelizeAuditStatusHistory = (auditStatusHistory: ApiAuditStatusHistoryType): AuditStatusHistoryType => {
    return {
        uuid: auditStatusHistory.uuid,
        createdAt: auditStatusHistory.created_at,
        status: auditStatusHistory.status,
        details: auditStatusHistory.details,
        auditParametersId: auditStatusHistory.parameters_id,
        auditId: auditStatusHistory.audit_id,
    };
};

export const modelizeApiAuditStatusHistoriesToById = (apiAuditStatusHistories: ApiAuditStatusHistoryType[]): Record<string, AuditStatusHistoryType> => {
    return apiAuditStatusHistories.reduce((auditStatusHistoriesById, apiAuditStatusHistory) => ({
        ...auditStatusHistoriesById,
        [apiAuditStatusHistory.uuid]: modelizeAuditStatusHistory(apiAuditStatusHistory),
    }), {});
};

export const modelizeApiAuditStatusHistoriesToByPageOrScriptIdAndAuditParametersId =
    (apiAuditStatusHistories: ApiAuditStatusHistoryType[]): Record<string, string> => {
        return apiAuditStatusHistories.reduce(
            (auditStatusHistoriesByPageOrScriptIdAndAuditParametersId: Record<string, Record<string, string>>, apiAuditStatusHistory: ApiAuditStatusHistoryType) => ({
                ...auditStatusHistoriesByPageOrScriptIdAndAuditParametersId,
                [apiAuditStatusHistory.page_id || apiAuditStatusHistory.script_id]: {
                    ...auditStatusHistoriesByPageOrScriptIdAndAuditParametersId[apiAuditStatusHistory.page_id || apiAuditStatusHistory.script_id],
                    [apiAuditStatusHistory.parameters_id]: apiAuditStatusHistory.uuid,
                },
            }),
            {},
        );
    };
