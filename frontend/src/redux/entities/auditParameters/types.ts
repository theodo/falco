export interface AuditParametersType {
    uuid: string;
    name: string;
    location: string;
    browser: string;
    networkShape: string;
    configurationId: string;
}

export interface ApiAuditParametersType {
    uuid: string;
    name: string;
    location: string;
    location_label: string;
    browser: string;
    network_shape: string;
    configuration: string;
}

export interface AuditParametersTableDisplayType {
    uuid: string;
    name: string;
    networkShape: string;
    configurationId: string;
}