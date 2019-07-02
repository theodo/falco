import { AuditParametersType } from 'redux/entities/projects/types';
import { RootState } from 'redux/types';

export const selectAuditParametersAsDict = (
  state: RootState,
  projectId: string,
): Record<string, AuditParametersType> => {
  if (state.projects.byId && state.projects.byId[projectId]) {
    return state.projects.byId[projectId].auditParametersList.reduce(
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
