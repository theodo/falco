import React from 'react';
import Select from 'components/Select/Select';
import AddIcon from 'icons/Add';
import CheckmarkIcon from 'icons/Checkmark';
import CloseIcon from 'icons/Close';
import { FormattedMessage, useIntl } from 'react-intl';
import { colorUsage, getSpacing } from 'stylesheet';
import {
  AddAuditParameterButtonContainer,
  AddAuditParameterButtonLabel,
  AddAuditParameterButtonsContainer,
  AddNameInput,
  AuditParameterRowButton,
} from '../AuditParameterTable.style';
import { availableNetworkShape } from '../common';

export interface OwnProps {
  projectId: string;
  availableAuditParameters: { uuid: string; label: string }[];
}

type Props = {
  addAuditParameterToProjectRequest: (
    projectId: string,
    auditParameterName: string,
    auditParameterNetworkShape: string,
    auditParameterConfigurationId: string,
  ) => void;
} & OwnProps;

const useFocus = (): [React.MutableRefObject<any>, () => void] => {
  const htmlElRef = React.useRef<HTMLInputElement>(null);
  const setFocus = () => {
    if (htmlElRef.current) {
      htmlElRef.current.focus();
    }
  };

  return [htmlElRef, setFocus];
};

export const AddAuditParameterRow: React.FunctionComponent<Props> = ({
  projectId,
  addAuditParameterToProjectRequest,
  availableAuditParameters,
}) => {
  const intl = useIntl();

  const [auditParameterName, setAuditParameterName] = React.useState('');
  const [auditParameterConfigurationId, setAuditParameterConfigurationId] = React.useState('');
  const [auditParameterNetworkShape, setAuditParameterNetworkShape] = React.useState('');
  const [isAddingMode, setAddingMode] = React.useState(false);
  const [nameInputRef, setNameInputFocus] = useFocus();

  React.useEffect(
    () => {
      setNameInputFocus();
    },
    [isAddingMode, setNameInputFocus],
  );

  const cancel = () => {
    setAuditParameterName('');
    setAuditParameterNetworkShape('');
    setAuditParameterConfigurationId('');
    setAddingMode(false);
  };

  const validate = () => {
    if (auditParameterName && auditParameterConfigurationId && auditParameterNetworkShape) {
      addAuditParameterToProjectRequest(
        projectId,
        auditParameterName,
        auditParameterNetworkShape,
        auditParameterConfigurationId,
      );

      setAuditParameterName('');
      setAuditParameterConfigurationId('');
      setAuditParameterNetworkShape('');
      setAddingMode(false);
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

  const activateAddingMode = () => {
    setAddingMode(true);
  };

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
      <AddAuditParameterButtonContainer isAdding={isAddingMode} onClick={activateAddingMode}>
        <AddIcon color={colorUsage.projectSettingsIconColor} width="24px" strokeWidth="15" />
        <AddAuditParameterButtonLabel>
          <FormattedMessage id="ProjectSettings.add_audit_parameter" />
        </AddAuditParameterButtonLabel>
      </AddAuditParameterButtonContainer>
      <AddNameInput
        isAdding={isAddingMode}
        value={auditParameterName}
        onChange={handleNameChange}
        ref={nameInputRef}
        placeholder={intl.formatMessage({ id: 'ProjectSettings.audit_parameter_name_placeholder' })}
      />
      <Select
        value={foundAuditParameter}
        onChange={handleConfigurationChange}
        options={formattedAvailableAuditParameters}
        display={isAddingMode ? 'visible' : 'none'}
        width="40%"
        margin={selectMargin}
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
        display={isAddingMode ? 'visible' : 'none'}
        width="20%"
        margin={selectMargin}
        placeholder={intl.formatMessage({
          id: 'ProjectSettings.audit_parameter_network_shape_placeholder',
        })}
      />
      <AddAuditParameterButtonsContainer isAdding={isAddingMode}>
        <AuditParameterRowButton onClick={validate}>
          <CheckmarkIcon color={colorUsage.projectSettingsIconColor} width="16px" strokeWidth="5" />
        </AuditParameterRowButton>
        <AuditParameterRowButton onClick={cancel}>
          <CloseIcon color={colorUsage.projectSettingsIconColor} width="13px" strokeWidth="15" />
        </AuditParameterRowButton>
      </AddAuditParameterButtonsContainer>
    </React.Fragment>
  );
};
