import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { ProjectType } from 'redux/entities/projects/types';
import { UserState } from 'redux/user';
import { isUserAdminOfProject } from 'services/utils';
import AddAuditParameterRow from './AddAuditParameterRow';
import AuditParameterRow from './AuditParameterRow';
import { AuditParameterName, Configuration, ElementContainer, NetworkShape, ProjectSettingsBlock } from './AuditParameterTable.style';

interface ModelizedAvailableAuditParameters {
    uuid: string,
    label: string,
}

type Props = {
    currentUser: UserState,
    project: ProjectType;
    availableAuditParameters: ModelizedAvailableAuditParameters[];
    add: (projectId: string, auditParameterName: string, auditParameterNetworkShape: string, auditParameterConfigurationId: string) => void;
    edit: (projectId: string, auditParameter: { name: string, uuid: string, configuration_id: string, network_shape: string }) => void;
    del: (projectId: string, auditParameterId: string) => void;
} & InjectedIntlProps;


const ProjectAuditParameterTable = ({ project, currentUser, availableAuditParameters, add, edit, del, intl }: Props) => (
    <ProjectSettingsBlock>
        <ElementContainer>
            <AuditParameterName>{intl.formatMessage({ id: "ProjectSettings.audit_parameter_name" })}</AuditParameterName>
            <Configuration>{intl.formatMessage({ id: "ProjectSettings.configuration" })}</Configuration>
            <NetworkShape>
                {intl.formatMessage({ id: "ProjectSettings.network_type" })}
            </NetworkShape>
        </ElementContainer>
        {project.auditParametersIds.map(auditParameterId => (
            <ElementContainer key={auditParameterId}>
                <AuditParameterRow
                    disabled={!isUserAdminOfProject(currentUser, project)}
                    projectId={project.uuid}
                    auditParameterId={auditParameterId}
                    availableAuditParameters={availableAuditParameters}
                    edit={edit}
                    del={del}
                />
            </ElementContainer>))}
        {isUserAdminOfProject(currentUser, project) && <ElementContainer>
            <AddAuditParameterRow
                projectId={project.uuid}
                availableAuditParameters={availableAuditParameters}
                addAuditParameterToProjectRequest={add}
            />
        </ElementContainer>}
    </ProjectSettingsBlock>
)

export default injectIntl(ProjectAuditParameterTable)
