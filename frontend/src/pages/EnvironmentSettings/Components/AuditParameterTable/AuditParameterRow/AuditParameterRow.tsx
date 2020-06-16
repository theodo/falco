import Select from 'components/Select';
import Close from 'icons/Close';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { AuditParametersType } from 'redux/entities/auditParameters/types';
import { colorUsage } from 'stylesheet';
import { getSpacing } from 'stylesheet';
import {
  AuditParameterDeleteContainer,
  AuditParameterRowButton,
  EditNameInput,
} from '../AuditParameterTable.style';
import { availableNetworkShape } from '../common';

export interface OwnProps {
  auditParameterId: string;
  projectId: string;
  disabled: boolean;
  availableAuditParameters: Array<{ uuid: string; label: string }>;
}

type Props = {
  auditParameter?: AuditParametersType | null;
  editAuditParameterRequest: (
    projectId: string,
    auditParameter: { name: string; uuid: string; configuration_id: string; network_shape: string },
  ) => void;
  deleteAuditParameterFromProjectRequest: (projectId: string, auditParameterId: string) => void;
} & OwnProps;

export const AuditParameterRow: React.FunctionComponent<Props> = ({
  auditParameterId,
  auditParameter,
  projectId,
  editAuditParameterRequest,
  disabled,
  deleteAuditParameterFromProjectRequest,
  availableAuditParameters,
}) => {
  const intl = useIntl();

  const [auditParameterName, setAuditParameterName] = React.useState('');
  const [auditParameterNetworkShape, setAuditParameterNetworkShape] = React.useState('');
  const [auditParameterConfigurationId, setAuditParameterConfigurationId] = React.useState('');

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
    if (
      auditParameter &&
      (auditParameterName !== auditParameter.name ||
        auditParameterConfigurationId !== auditParameter.configurationId ||
        auditParameter.networkShape !== auditParameterNetworkShape)
    ) {
      editAuditParameterRequest(projectId, {
        uuid: auditParameter.uuid,
        name: auditParameterName,
        configuration_id: auditParameterConfigurationId,
        network_shape: auditParameterNetworkShape,
      });
    }
  };

  const handleNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setAuditParameterName(e.currentTarget.value);
  };

  const handleConfigurationChange = (e: any) => {
    setAuditParameterConfigurationId(e.value);
  };

  const handleNetworkShapeChange = (e: any) => {
    setAuditParameterNetworkShape(e.value);
  };

  const handleAuditParameterDeletion = (
    currentProjectId: string,
    targetAuditParameterId: string,
  ) => {
    toastr.confirm(
      intl.formatMessage({ id: 'Toastr.ProjectSettings.delete_auditParameter_confirm_question' }),
      {
        onOk: () =>
          deleteAuditParameterFromProjectRequest(currentProjectId, targetAuditParameterId),
      },
    );
  };

  if (null === auditParameter || undefined === auditParameter) {
    return null;
  }

  const selectMargin = `0 ${getSpacing(2)} 0 0`;

  const formattedAvailableAuditParameters = availableAuditParameters.map(
    availableAuditParameter => ({
      label: availableAuditParameter.label,
      value: availableAuditParameter.uuid,
    }),
  );

  const foundAuditParameter = formattedAvailableAuditParameters.find(auditParametersOption => {
    return auditParametersOption.value === auditParameterConfigurationId;
  });

  return (
    <React.Fragment>
      <EditNameInput
        disabled={disabled}
        value={auditParameterName}
        onChange={handleNameChange}
        onBlur={handleBlur}
      />
      <Select
        value={foundAuditParameter}
        onChange={handleConfigurationChange}
        options={formattedAvailableAuditParameters}
        margin={selectMargin}
        width="40%"
        onBlur={handleBlur}
        placeholder={intl.formatMessage({
          id: 'ProjectSettings.audit_parameter_configuration_placeholder',
        })}
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
        placeholder={intl.formatMessage({
          id: 'ProjectSettings.audit_parameter_network_shape_placeholder',
        })}
      />
      <AuditParameterDeleteContainer>
        <AuditParameterRowButton
          onClick={() => handleAuditParameterDeletion(projectId, auditParameterId)}
        >
          <Close color={colorUsage.projectSettingsIconColor} width="13px" strokeWidth="15" />
        </AuditParameterRowButton>
      </AuditParameterDeleteContainer>
    </React.Fragment>
  );
};
