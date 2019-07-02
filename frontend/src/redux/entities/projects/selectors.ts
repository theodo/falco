import { AuditParametersType } from 'redux/entities/projects/types';
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
