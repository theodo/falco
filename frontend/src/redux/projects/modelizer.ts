import { ApiProjectType, ProjectType } from './types';

export const modelizeProject = (project: ApiProjectType) => ({
  [project.uuid]: {
    uuid: project.uuid,
    name: project.name,
    pages: project.pages.map(page => page.uuid),
  },
});

export const modelizeProjects = (projects: ApiProjectType[]) => {
  return projects.reduce(
    (projectsById, project) => ({
      ...projectsById,
      ...modelizeProject(project),
    }),
    {},
  );
};
