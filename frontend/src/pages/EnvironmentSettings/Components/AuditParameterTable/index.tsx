import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { ProjectType } from 'redux/entities/projects/types';
import { UserState } from 'redux/user';
import { isUserAdminOfProject } from 'services/utils';
import Style from '../../EnvironmentSettings.style';
import AddAuditParameterRow from './AddAuditParameterRow';
import AuditParameterRow from './AuditParameterRow';

interface ModelizedAvailableAuditParameters {
    uuid: string,
    label: string,
}

type Props = {
    currentUser: UserState,
    project: ProjectType;
    availableAuditParameters: ModelizedAvailableAuditParameters[];
    add?: (projectId: string, auditParameterName: string, auditParameterNetworkShape: string, auditParameterConfigurationId: string) => void;
    edit?: (projectId: string, auditParameter: { name: string, uuid: string, configuration_id: string, network_shape: string }) => void;
    del?: (projectId: string, auditParameterId: string) => void;
} & InjectedIntlProps;


const ProjectAuditParameterTable = ({ project, currentUser, availableAuditParameters, add, edit, del, intl }: Props) => (
    <Style.ProjectSettingsBlock>
        <Style.ElementContainer>
            <Style.AuditParameterName>{intl.formatMessage({ id: "ProjectSettings.audit_parameter_name" })}</Style.AuditParameterName>
            <Style.Configuration>{intl.formatMessage({ id: "ProjectSettings.configuration" })}</Style.Configuration>
            <Style.NetworkShape>
                {intl.formatMessage({ id: "ProjectSettings.network_type" })}
            </Style.NetworkShape>
        </Style.ElementContainer>
        {project.auditParametersIds.map(auditParameterId => (
            <Style.ElementContainer key={auditParameterId}>
                <AuditParameterRow
                    disabled={!isUserAdminOfProject(currentUser, project)}
                    projectId={project.uuid}
                    auditParameterId={auditParameterId}
                    availableAuditParameters={availableAuditParameters}
                />
            </Style.ElementContainer>))}
        {isUserAdminOfProject(currentUser, project) && <Style.ElementContainer>
            <AddAuditParameterRow
                projectId={project.uuid}
                availableAuditParameters={availableAuditParameters}
            />
        </Style.ElementContainer>}
    </Style.ProjectSettingsBlock>
)

export default ProjectAuditParameterTable
