import { ApiAuditParametersType } from "../auditParameters/types";
import { ApiPageType } from "../pages/types";
import { ApiScriptType } from "../scripts/types";


export interface ProjectType {
  uuid: string;
  name: string;
  pagesIds: string[];
  scriptsIds: string[];
  screenshotUrl: string;
  latestAuditAt: string;
  auditParametersIds: string[];
};

export interface ApiProjectType {
  uuid: string;
  name: string;
  pages: ApiPageType[];
  scripts: ApiScriptType[];
  audit_parameters_list: ApiAuditParametersType[];
  screenshot_url: string;
  latest_audit_at: string;
};

export interface ApiProjectResponseType {
  project: ApiProjectType;
  has_siblings: boolean;
};
