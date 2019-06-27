import { modelizeAuditStatusHistory } from 'redux/auditResults/modelizer';
import { ApiProjectType, PageType, ProjectType, ScriptType } from './types';

export const modelizeProject = (project: ApiProjectType): Record<string, ProjectType> => ({
  [project.uuid]: {
    uuid: project.uuid,
    name: project.name,
    pages: project.pages.map(page => ({
      uuid: page.uuid,
      url: page.url,
      name: page.name,
      latestAuditStatusHistory: modelizeAuditStatusHistory(page.latest_audit_status_history),
    })),
    scripts: project.scripts.map(script => ({
      uuid: script.uuid,
      name: script.name,
      latestAuditStatusHistory: modelizeAuditStatusHistory(script.latest_audit_status_history),
    })),
    auditParametersList: project.audit_parameters_list.map(auditParameters => ({
      uuid: auditParameters.uuid,
      name: auditParameters.name,
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

export const modelizePages = (pages: PageType[]): Record<string, PageType> => {
  return pages.reduce((pagesById, page) => {
    return {
      ...pagesById,
      [page.uuid]: {
        uuid: page.uuid,
        name: page.name,
        url: page.url,
      },
    };
  }, {});
};

export const modelizeScripts = (scripts: ScriptType[]): Record<string, ScriptType> => {
  return scripts.reduce((scriptsById, script) => {
    return {
      ...scriptsById,
      [script.uuid]: {
        uuid: script.uuid,
        name: script.name,
      },
    };
  }, {});
};
