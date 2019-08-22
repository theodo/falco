import { ApiUser, User } from "redux/user/types";
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
  members: User[];
  admins: User[]
};

export interface ApiProjectType {
  uuid: string;
  name: string;
  pages: ApiPageType[];
  scripts: ApiScriptType[];
  audit_parameters_list: ApiAuditParametersType[];
  screenshot_url: string;
  latest_audit_at: string;
  members: ApiUser[];
  admins: ApiUser[];
};

export interface ApiProjectResponseType {
  project: ApiProjectType;
  has_siblings: boolean;
};
