import { ApiAuditParametersType, AuditParametersType } from "./types";


const modelizeAuditParameters = (apiAuditParameters: ApiAuditParametersType): AuditParametersType => ({
    uuid: apiAuditParameters.uuid,
    name: apiAuditParameters.name,
    location: apiAuditParameters.location,
    browser: apiAuditParameters.browser,
    networkShape: apiAuditParameters.network_shape,
});

export const modelizeApiAuditParametersListToById = (apiAuditParametersList: ApiAuditParametersType[]): Record<string, AuditParametersType> => {
    return apiAuditParametersList.reduce((auditParametersById, auditParameters) => {
        return {
            ...auditParametersById,
            [auditParameters.uuid]: modelizeAuditParameters(auditParameters),
        };
    }, {});
};
