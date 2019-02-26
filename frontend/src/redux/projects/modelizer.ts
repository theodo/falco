import { ApiProjectType } from './types';

export const modelizeProject = (project: ApiProjectType) => ({
  [project.uuid]: {
    uuid: project.uuid,
    name: project.name,
    pages: project.pages.map(page => page.uuid),
  },
});
