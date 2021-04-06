import { RootState } from 'redux/types';
import { getProject } from '../projects/selectors';
import { AuditParametersType } from './types';

export const getProjectAuditParameters = (
  state: RootState,
  projectId: string,
): AuditParametersType[] | undefined => {
  const project = getProject(state, projectId);
  if (!project) {
    return undefined;
  }

  return project.auditParametersIds
    .map((auditParametersId) => getAuditParameters(state, auditParametersId))
    .filter(
      (auditParameters): auditParameters is AuditParametersType =>
        auditParameters !== null && auditParameters !== undefined,
    );
};

export const getAuditParameters = (
  state: RootState,
  auditParametersId: string,
): AuditParametersType | null | undefined => {
  return state.entities.auditParameters.byId
    ? state.entities.auditParameters.byId[auditParametersId]
    : undefined;
};
