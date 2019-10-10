import { ApiAuditParametersType, AuditParametersType } from "./types";


export const modelizeAuditParameters = (apiAuditParameters: ApiAuditParametersType): AuditParametersType => ({
    uuid: apiAuditParameters.uuid,
    name: apiAuditParameters.name,
    location: apiAuditParameters.location_label,
    browser: apiAuditParameters.browser,
    networkShape: apiAuditParameters.network_shape,
    configurationId: apiAuditParameters.configuration_uuid,
});

export const modelizeAuditParametersById = (apiAuditParameters: ApiAuditParametersType): Record<string, AuditParametersType> => ({
    [apiAuditParameters.uuid]: {
        uuid: apiAuditParameters.uuid,
        name: apiAuditParameters.name,
        location: apiAuditParameters.location_label,
        browser: apiAuditParameters.browser,
        networkShape: apiAuditParameters.network_shape,
        configurationId: apiAuditParameters.configuration_uuid,
    }
});

export const modelizeApiAuditParametersListToById = (apiAuditParametersList: ApiAuditParametersType[]): Record<string, AuditParametersType> => {
    return apiAuditParametersList.reduce((auditParametersById, auditParameters) => {
        return {
            ...auditParametersById,
            [auditParameters.uuid]: modelizeAuditParameters(auditParameters),
        };
    }, {});
};
