import { PageType } from 'redux/pages/types';

export type ProjectType = {
  uuid: string;
  name: string;
  pages: string[];
};

export type ApiProjectType = {
  uuid: string;
  name: string;
  pages: PageType[];
};
