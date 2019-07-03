import { modelizeAuditParameters } from '../auditParameters/modelizer';
import { ApiProjectType, ProjectType } from './types';

export const modelizeProject = (project: ApiProjectType): Record<string, ProjectType> => ({
  [project.uuid]: {
    uuid: project.uuid,
    name: project.name,
    pagesIds: project.pages.map(page => page.uuid),
    scriptsIds: project.scripts.map(script => script.uuid),
    auditParametersList: project.audit_parameters_list.map(modelizeAuditParameters),
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
