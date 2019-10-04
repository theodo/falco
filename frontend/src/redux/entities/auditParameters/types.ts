export interface AuditParametersType {
    uuid: string;
    name: string;
    location: string;
    browser: string;
    networkShape: string;
}

export interface ApiAuditParametersType {
    uuid: string;
    name: string;
    location: string;
    browser: string;
    network_shape: string;
}

export enum NetworkShapeEnum {
    CABLE = "Cable",
    DSL = "DSL",
    THREE_G_SLOW = "3GSlow",
    THREE_G = "3G",
    THREE_G_FAST = "3GFast",
    FOUR_G = "4G",
    LTE = "LTE",
    EDGE = "Edge",
    TWO_G = "2G",
    DIAL = "Dial",
    FIOS = "FIOS",
    NATIVE = "Native",
    CUSTOM = "custom",
}
