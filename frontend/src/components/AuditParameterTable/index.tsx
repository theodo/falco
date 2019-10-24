import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import AddAuditParameterRow from './AddAuditParameterRow';
import AuditParameterRow from './AuditParameterRow';
import { AuditParameterName, Configuration, ElementContainer, NetworkShape, ProjectSettingsBlock } from './AuditParameterTable.style';

import { AuditParametersTableDisplayType, AuditParametersType } from 'redux/entities/auditParameters/types';
interface ModelizedAvailableAuditParameters {
    uuid: string,
    label: string,
}

type Props = {
    disabled: boolean;
    auditParameters: Array<AuditParametersType | AuditParametersTableDisplayType> | undefined;
    availableAuditParameters: ModelizedAvailableAuditParameters[];
    add: (auditParameterName: string, auditParameterNetworkShape: string, auditParameterConfigurationId: string) => void;
    edit: (auditParameter: { name: string, uuid: string, configuration_id: string, network_shape: string }) => void;
    del: (auditParameterId: string) => void;
} & InjectedIntlProps;


const ProjectAuditParameterTable = ({ disabled, auditParameters, availableAuditParameters, add, edit, del, intl }: Props) => (
    <ProjectSettingsBlock>
        <ElementContainer>
            <AuditParameterName>{intl.formatMessage({ id: "ProjectSettings.audit_parameter_name" })}</AuditParameterName>
            <Configuration>{intl.formatMessage({ id: "ProjectSettings.configuration" })}</Configuration>
            <NetworkShape>
                {intl.formatMessage({ id: "ProjectSettings.network_type" })}
            </NetworkShape>
        </ElementContainer>
        {auditParameters && auditParameters.map(auditParameter => (
            <ElementContainer key={auditParameter.uuid}>
                <AuditParameterRow
                    disabled={disabled}
                    auditParameter={auditParameter}
                    availableAuditParameters={availableAuditParameters}
                    edit={edit}
                    del={del}
                />
            </ElementContainer>))}
        {!disabled && <ElementContainer>
            <AddAuditParameterRow
                availableAuditParameters={availableAuditParameters}
                add={add}
            />
        </ElementContainer>}
    </ProjectSettingsBlock>
)

export default injectIntl(ProjectAuditParameterTable)
