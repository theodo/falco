import { PageType } from 'redux/pages/types';

export interface ProjectType {
  uuid: string;
  name: string;
  pages: string[];
}

export interface ApiProjectType {
  uuid: string;
  name: string;
  pages: PageType[];
}
