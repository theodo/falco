import { RootState } from "redux/types";
import { getProject } from "../projects/selectors";
import { AuditParametersType } from "./types";


export const getProjectAuditParameters = (state: RootState, projectId: string): AuditParametersType[] => {
    const project = getProject(state, projectId);
    if (!project) {
        return [];
    }
    return project.auditParametersList
        .map(auditParameters => getAuditParameters(state, auditParameters.uuid))
        .filter((auditParameters): auditParameters is AuditParametersType => auditParameters !== null);
};

export const getProjectAuditParametersById = (state: RootState, projectId: string): Record<string, AuditParametersType> => {
    const auditParametersList = getProjectAuditParameters(state, projectId);
    return auditParametersList.reduce((byId: Record<string, AuditParametersType>, auditParameters: AuditParametersType) => {
        return {
            ...byId,
            [auditParameters.uuid]: auditParameters,
        }
    }, {})
};

export const getAuditParameters = (state: RootState, auditParametersId: string): AuditParametersType | null => {
    return state.entities.auditParameters.byId && state.entities.auditParameters.byId[auditParametersId];
}
