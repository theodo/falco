import { ApiAuditParametersType, AuditParametersType } from "./types";


export const modelizeAuditParameters = (apiAuditParameters: ApiAuditParametersType): AuditParametersType => ({
    uuid: apiAuditParameters.uuid,
    name: apiAuditParameters.name,
    location: apiAuditParameters.location,
    browser: apiAuditParameters.browser,
    networkShape: apiAuditParameters.network_shape,
})
