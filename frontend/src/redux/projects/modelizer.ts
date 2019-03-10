import { ApiProjectType, ProjectType } from './types';

export const modelizeProject = (project: ApiProjectType): Record<string, ProjectType> => ({
  [project.uuid]: {
    uuid: project.uuid,
    name: project.name,
    pages: project.pages.map(page => ({
      uuid: page.uuid,
      url: page.url,
      name: page.name,
    })),
    auditParametersList: project.audit_parameters_list.map(auditParameters => ({
      uuid: auditParameters.uuid,
      location: auditParameters.location,
      browser: auditParameters.browser,
      networkShape: auditParameters.network_shape,
    })),
    screenshotUrl: project.screenshot_url,
    latestAuditAt: project.latest_audit_at,
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
