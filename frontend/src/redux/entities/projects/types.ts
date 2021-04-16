import { ApiAuditParametersType } from '../auditParameters/types';
import { ApiPageType } from '../pages/types';
import { ApiScriptType } from '../scripts/types';

export interface ProjectType {
  uuid: string;
  name: string;
  pagesIds: string[];
  scriptsIds: string[];
  screenshotUrl: string;
  latestAuditAt: string;
  auditParametersIds: string[];
  projectMembers: ProjectMember[];
  wptApiKey: string;
  wptInstanceURL: string;
}

export interface ApiProjectType {
  uuid: string;
  name: string;
  pages: ApiPageType[];
  scripts: ApiScriptType[];
  audit_parameters_list: ApiAuditParametersType[];
  screenshot_url: string;
  latest_audit_at: string;
  project_members: ApiProjectMember[];
  wpt_api_key: string;
  wpt_instance_url: string;
  has_siblings: boolean;
}

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

export type ProjectToastrDisplayType =
  | ''
  | 'addMemberSuccess'
  | 'addMemberError'
  | 'editPageSuccess'
  | 'editPageError'
  | 'addAuditParameterSuccess'
  | 'addAuditParameterError'
  | 'addPageSuccess'
  | 'addPageError'
  | 'deletePageSuccess'
  | 'deletePageError'
  | 'editProjectDetailsSuccess'
  | 'editProjectDetailsError'
  | 'editAuditParameterError'
  | 'editAuditParameterSuccess'
  | 'deleteAuditParameterSuccess'
  | 'deleteAuditParameterError'
  | 'addScriptToProjectSuccess'
  | 'addScriptToProjectError'
  | 'editScriptError'
  | 'editScriptSuccess'
  | 'deleteScriptError'
  | 'deleteScriptSuccess';
