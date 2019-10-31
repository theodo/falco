import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { makeGetRequest } from 'services/networking/request';
import AddAuditParameterRow from './AddAuditParameterRow';
import AuditParameterRow from './AuditParameterRow';
import { AuditParameterName, Configuration, ElementContainer, NetworkShape, ProjectSettingsBlock } from './AuditParameterTable.style';

import { AuditParametersTableDisplayType, AuditParametersType } from 'redux/entities/auditParameters/types';

interface ModelizedAvailableAuditParameters {
    uuid: string,
    label: string,
}

interface ApiAvailableAuditParameters {
    uuid: string,
    browser: string,
    location_label: string,
    location_group: string,
}

type Props = {
    disabled: boolean;
    auditParameters: Array<AuditParametersType | AuditParametersTableDisplayType> | undefined;
    add: (auditParameterName: string, auditParameterNetworkShape: string, auditParameterConfigurationId: string) => void;
    edit: (auditParameter: { name: string, uuid: string, configuration_id: string, network_shape: string }) => void;
    del: (auditParameterId: string) => void;
} & InjectedIntlProps;

const modelizeAvailableAuditParameters = (apiAvailableAuditParameters: ApiAvailableAuditParameters) => ({
    label: `${apiAvailableAuditParameters.location_label}. ${apiAvailableAuditParameters.browser}`,
    uuid: apiAvailableAuditParameters.uuid,
});


const ProjectAuditParameterTable = ({ disabled, auditParameters, add, edit, del, intl }: Props) => {
    const [availableAuditParameters, setAvailableAuditParameters] = React.useState<ModelizedAvailableAuditParameters[]>([])

    React.useEffect(
        () => {
            const request = makeGetRequest('/api/projects/available_audit_parameters', true);
            request
                .then((response) => {
                    if (response) {
                        setAvailableAuditParameters(response.body.map((apiAvailableAuditParameters: ApiAvailableAuditParameters) => modelizeAvailableAuditParameters(apiAvailableAuditParameters)));
                    }
                })
        },
        [],
    );

    return (
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
}
export default injectIntl(ProjectAuditParameterTable)
