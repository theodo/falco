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

export const modelizeApiAuditStatusHistoriesToByPageOrScriptIdAndAuditParametersId =
    (apiAuditStatusHistories: ApiAuditStatusHistoryType[]): Record<string, Record<string, AuditStatusHistoryType>> => {
        return apiAuditStatusHistories.reduce(
            (auditStatusHistoriesByPageOrScriptIdAndAuditParametersId: Record<string, Record<string, AuditStatusHistoryType>>, apiAuditStatusHistory: ApiAuditStatusHistoryType) => ({
                ...auditStatusHistoriesByPageOrScriptIdAndAuditParametersId,
                [apiAuditStatusHistory.page_id || apiAuditStatusHistory.script_id]: {
                    ...auditStatusHistoriesByPageOrScriptIdAndAuditParametersId[apiAuditStatusHistory.page_id || apiAuditStatusHistory.script_id],
                    [apiAuditStatusHistory.parameters_id]: modelizeAuditStatusHistory(apiAuditStatusHistory),
                },
            }),
            {},
        );
    };
