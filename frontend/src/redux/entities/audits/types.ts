export interface AuditTypeAndId {
    auditParametersId: string;
    pageOrScriptId: string;
    type: 'page' | 'script';
};

export interface ApiAuditType {
    uuid: string;
    parameters: string;
    page: string | null;
    script: string | null;
};
