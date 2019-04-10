import { PageType } from 'redux/pages/types';
import { ScriptType } from 'redux/scripts/types';

export interface AuditParametersType {
  uuid: string;
  location: string;
  browser: string;
  networkShape: string;
}

export interface ProjectType {
  uuid: string;
  name: string;
  pages: PageType[];
  scripts: ScriptType[];
  screenshotUrl: string;
  latestAuditAt: string;
  auditParametersList: AuditParametersType[];
}

export interface AuditParametersAPIType {
  uuid: string;
  location: string;
  browser: string;
  network_shape: string;
}

export interface ApiProjectType {
  uuid: string;
  name: string;
  pages: PageType[];
  scripts: ScriptType[];
  audit_parameters_list: AuditParametersAPIType[];
  screenshot_url: string;
  latest_audit_at: string;
}
