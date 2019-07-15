import { ApiAuditType, AuditType } from "./types";

export const modelizeAudit = (apiAudit: ApiAuditType): AuditType => {
    return {
        uuid: apiAudit.uuid,
        auditParametersId: apiAudit.parameters,
        pageId: apiAudit.page,
        scriptId: apiAudit.script,
    };
};
