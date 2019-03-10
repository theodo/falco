import { PageType } from 'redux/pages/types';

export interface ProjectType {
  uuid: string;
  name: string;
  pages: PageType[];
  screenshotUrl: string;
}

export interface AuditParametersType {
  uuid: string;
  location: string;
  browser: string;
  network_shape: string;
}

export interface ApiProjectType {
  uuid: string;
  name: string;
  pages: PageType[];
  audit_parameters_list: AuditParametersType[];
  screenshot_url: string;
}
