import { modelizeUser } from 'redux/user/modelizer';
import { ApiProjectType, ProjectType } from './types';

export const modelizeProject = (project: ApiProjectType): Record<string, ProjectType> => ({
  [project.uuid]: {
    uuid: project.uuid,
    name: project.name,
    pagesIds: project.pages.map(page => page.uuid),
    scriptsIds: project.scripts.map(script => script.uuid),
    auditParametersIds: project.audit_parameters_list.map(auditParameters => auditParameters.uuid),
    screenshotUrl: project.screenshot_url,
    latestAuditAt: project.latest_audit_at,
    members: project.members.map(ApiUser => modelizeUser(ApiUser)),
    admins: project.admins.map(ApiUser => modelizeUser(ApiUser))
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
