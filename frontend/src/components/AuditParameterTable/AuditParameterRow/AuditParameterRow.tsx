import Select from 'components/Select';
import Close from 'icons/Close';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { AuditParametersType } from 'redux/entities/auditParameters/types';
import { colorUsage } from 'stylesheet';
import { getSpacing } from 'stylesheet';
import { AuditParameterDeleteContainer, AuditParameterRowButton, EditNameInput } from '../AuditParameterTable.style';
import { availableNetworkShape } from '../common'

export interface OwnProps {
  auditParameterId: string,
  projectId: string,
  disabled: boolean,
  availableAuditParameters: Array<{ uuid: string, label: string }>
  edit: (projectId: string, auditParameter: { name: string, uuid: string, configuration_id: string, network_shape: string }) => void;
  del: (projectId: string, auditParameterId: string) => void;
}

type Props = {
  auditParameter?: AuditParametersType | null,
  edit: (projectId: string, auditParameter: { name: string, uuid: string, configuration_id: string, network_shape: string }) => void,
  del: (projectId: string, auditParameterId: string) => void;
} & OwnProps & InjectedIntlProps;

export const AuditParameterRow: React.FunctionComponent<Props> = ({
  auditParameterId,
  auditParameter,
  projectId,
  edit,
  disabled,
  del,
  availableAuditParameters,
  intl
}) => {
  const [auditParameterName, setAuditParameterName] = React.useState('');
  const [auditParameterNetworkShape, setAuditParameterNetworkShape] = React.useState('');
  const [auditParameterConfigurationId, setAuditParameterConfigurationId] = React.useState('')

  React.useEffect(
    () => {
      if (auditParameter) {
        setAuditParameterName(auditParameter.name);
        setAuditParameterConfigurationId(auditParameter.configurationId);
        setAuditParameterNetworkShape(auditParameter.networkShape);
      }
    },
    [auditParameter],
  );

  const handleBlur = () => {
    if (auditParameter && (auditParameterName !== auditParameter.name || auditParameterConfigurationId !== auditParameter.configurationId || auditParameter.networkShape !== auditParameterNetworkShape)) {
      edit(
        projectId,
        {
          uuid: auditParameter.uuid,
          name: auditParameterName,
          configuration_id: auditParameterConfigurationId,
          network_shape: auditParameterNetworkShape,
        })
    }
  };

  const handleNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setAuditParameterName(e.currentTarget.value)
  }

  const handleConfigurationChange = (e: any) => {
    setAuditParameterConfigurationId(e.uuid)
  }

  const handleNetworkShapeChange = (e: any) => {
    setAuditParameterNetworkShape(e.value)
  }

  const handleAuditParameterDeletion = (currentProjectId: string, targetAuditParameterId: string) => {
    toastr.confirm(intl.formatMessage({ id: 'Toastr.ProjectSettings.delete_auditParameter_confirm_question' }),
      {
        onOk: () => del(currentProjectId, targetAuditParameterId)
      })
  }

  if (null === auditParameter || undefined === auditParameter) {
    return (null);
  };

  const selectMargin = `0 ${getSpacing(2)} 0 0`


  const foundAuditParameter = availableAuditParameters.find(auditParametersOption => {
    return auditParametersOption.uuid === auditParameterConfigurationId;
  });
  const auditParameterValue = foundAuditParameter && {
    ...availableAuditParameters.find(auditParametersOption => {
      return auditParametersOption.uuid === auditParameterConfigurationId;
    })
    , value: auditParameterConfigurationId
  };
  return (
    <React.Fragment>
      <EditNameInput
        disabled={disabled}
        value={auditParameterName}
        onChange={handleNameChange}
        onBlur={handleBlur}
      />
      <Select
        value={auditParameterValue}
        onChange={handleConfigurationChange}
        options={availableAuditParameters}
        margin={selectMargin}
        width="40%"
        onBlur={handleBlur}
        placeholder={intl.formatMessage({ id: 'ProjectSettings.audit_parameter_configuration_placeholder' })}
      />
      <Select
        value={availableNetworkShape.find(auditParametersOption => {
          return auditParametersOption.value === auditParameterNetworkShape;
        })}
        onChange={handleNetworkShapeChange}
        options={availableNetworkShape}
        margin={selectMargin}
        width="20%"
        onBlur={handleBlur}
        placeholder={intl.formatMessage({ id: 'ProjectSettings.audit_parameter_network_shape_placeholder' })}
      />
      <AuditParameterDeleteContainer>
        <AuditParameterRowButton onClick={() => handleAuditParameterDeletion(projectId, auditParameterId)}>
          <Close
            color={colorUsage.projectSettingsIconColor}
            width="13px"
            strokeWidth="20"
          />
        </AuditParameterRowButton>
      </AuditParameterDeleteContainer >
    </React.Fragment>
  )
}
