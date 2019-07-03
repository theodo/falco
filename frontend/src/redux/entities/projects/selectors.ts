import { AuditParametersType, ProjectType } from 'redux/entities/projects/types';
import { RootState } from 'redux/types';

export const selectAuditParametersAsDict = (
  state: RootState,
  projectId: string,
): Record<string, AuditParametersType> => {
  if (state.entities.projects.byId && state.entities.projects.byId[projectId]) {
    return state.entities.projects.byId[projectId].auditParametersList.reduce(
      (auditParametersDict, auditParameters) => {
        return {
          ...auditParametersDict,
          [auditParameters.uuid]: { ...auditParameters },
        };
      },
      {},
    );
  }
  return {};
};

export const getAllProjects = (state: RootState): ProjectType[] | null => {
  return state.entities.projects.byId
    ? Object.keys(state.entities.projects.byId)
      .map(projectId =>
        state.entities.projects.byId ? state.entities.projects.byId[projectId] : null,
      )
      .filter((project): project is ProjectType => project !== null)
    : null;
}

export const getProject = (state: RootState, projectId: string): ProjectType | null | undefined => {
  if (!state.entities.projects.byId) {
    return undefined;
  }
  return state.entities.projects.byId && state.entities.projects.byId[projectId];
}
