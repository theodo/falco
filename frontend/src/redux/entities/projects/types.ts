import { ApiPageType, PageType } from "../pages/types";

export interface AuditParametersType {
  uuid: string;
  name: string;
  location: string;
  browser: string;
  networkShape: string;
}

export interface ScriptType {
  uuid: string;
  name: string;
  latestAuditStatusHistories: AuditStatusHistoryType[];
}

export interface ApiScriptType {
  uuid: string;
  name: string;
  latest_audit_status_histories: ApiAuditStatusHistoryType[];
}

export interface ProjectType {
  uuid: string;
  name: string;
  pagesIds: string[];
  scripts: ScriptType[];
  screenshotUrl: string;
  latestAuditAt: string;
  auditParametersList: AuditParametersType[];
}

export interface AuditParametersAPIType {
  uuid: string;
  name: string;
  location: string;
  browser: string;
  network_shape: string;
}

export type StatusType = "SUCCESS" | "REQUESTED" | "PENDING" | "ERROR";

export interface AuditStatusHistoryType {
  createdAt: string;
  status: StatusType;
  details: string;
  auditParametersId: string;
}

export interface ApiAuditStatusHistoryType {
  created_at: string;
  status: StatusType;
  details: string;
  parameters: string;
}

export interface ApiProjectType {
  uuid: string;
  name: string;
  pages: ApiPageType[];
  scripts: ApiScriptType[];
  audit_parameters_list: AuditParametersAPIType[];
  screenshot_url: string;
  latest_audit_at: string;
}
