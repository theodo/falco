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
  projectMembers: ProjectMember[];
};

export interface ApiProjectType {
  uuid: string;
  name: string;
  pages: ApiPageType[];
  scripts: ApiScriptType[];
  audit_parameters_list: ApiAuditParametersType[];
  screenshot_url: string;
  latest_audit_at: string;
  project_members: ApiProjectMember[];
};

export interface ProjectMember {
  id: string;
  emailAddress: string;
  username: string;
  isAdmin: boolean;
}

export interface ApiProjectMember {
  id: string;
  username: string;
  email: string;
  is_admin: boolean;
}


export interface ApiProjectResponseType {
  project: ApiProjectType;
  has_siblings: boolean;
};
