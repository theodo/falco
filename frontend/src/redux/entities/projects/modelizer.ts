import { ApiProjectMember, ApiProjectType, ProjectMember, ProjectType } from './types';

export const modelizeProject = (project: ApiProjectType): Record<string, ProjectType> => ({
  [project.uuid]: {
    uuid: project.uuid,
    name: project.name,
    pagesIds: project.pages.map((page) => page.uuid),
    scriptsIds: project.scripts.map((script) => script.uuid),
    auditParametersIds: project.audit_parameters_list.map(
      (auditParameters) => auditParameters.uuid,
    ),
    screenshotUrl: project.screenshot_url,
    latestAuditAt: project.latest_audit_at,
    projectMembers: project.project_members.map((apiProjectMember) =>
      modelizeProjectMember(apiProjectMember),
    ),
    wptApiKey: project.wpt_api_key,
    wptInstanceURL: project.wpt_instance_url,
  },
});

export const modelizeProjectMember = (projectMember: ApiProjectMember): ProjectMember => ({
  id: projectMember.id,
  emailAddress: projectMember.email,
  username: projectMember.username,
  isAdmin: projectMember.is_admin,
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
