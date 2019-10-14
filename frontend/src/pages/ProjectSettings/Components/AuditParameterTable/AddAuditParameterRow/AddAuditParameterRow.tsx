import Select from 'components/Select/Select';
import { Add } from 'icons';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { colorUsage, getSpacing } from 'stylesheet';
import { AddAuditParameterButtonContainer, AddAuditParameterButtonLabel, AddNameInput } from '../AuditParameterTable.style';
import { availableNetworkShape } from '../common'

export interface  OwnProps {
  projectId: string,
  availableAuditParameters: Array<{uuid: string, label: string}>
}

type Props = {
  addAuditParameterToProjectRequest: (projectId: string, auditParameterName: string, auditParameterNetworkShape: string, auditParameterConfigurationId: string) => void,
} & OwnProps & InjectedIntlProps;

const useFocus = (): [React.MutableRefObject<any>, () => void] => {
  const htmlElRef = React.useRef<HTMLInputElement>(null)
  const setFocus = () => {
    if(htmlElRef.current) {
      htmlElRef.current.focus()
    }
  }

  return [ htmlElRef, setFocus ]
}

export const AddAuditParameterRow: React.FunctionComponent<Props> = ({
  projectId,
  addAuditParameterToProjectRequest,
  availableAuditParameters,
  intl
  }) => {
  const [auditParameterName, setAuditParameterName] = React.useState('');
  const [auditParameterConfigurationId, setAuditParameterConfigurationId] = React.useState('')
  const [auditParameterNetworkShape, setAuditParameterNetworkShape] = React.useState('')
  const [isAddingMode, setAddingMode] = React.useState(false);
  const [nameInputRef, setNameInputFocus] = useFocus();

  React.useEffect(
    () => {
      setNameInputFocus();
    },
    [isAddingMode],
  );

  const handleBlur = () => {
    if(!auditParameterName && !auditParameterNetworkShape && !auditParameterConfigurationId) {
      setAddingMode(false);
    }

    if(auditParameterName && auditParameterConfigurationId && auditParameterNetworkShape) {
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
    setAuditParameterName(e.currentTarget.value)
  }

  const handleConfigurationChange = (e: any) => {
    setAuditParameterConfigurationId(e.uuid)
  }

  const handleNetworkShapeChange = (e: any) => {
    setAuditParameterNetworkShape(e.value)
  }

  const activateAddingMode = () => {
    setAddingMode(true);
  }

  const selectMargin = `0 ${getSpacing(2)} 0 0`

  return (
    <React.Fragment>
      <AddAuditParameterButtonContainer isAdding={isAddingMode} onClick={activateAddingMode}>
        <Add
          color={colorUsage.projectSettingsIconColor}
          width="24px"
          strokeWidth="20"
        />
        <AddAuditParameterButtonLabel>
          {intl.formatMessage({id: 'ProjectSettings.add_audit_parameter'})}
        </AddAuditParameterButtonLabel>
      </AddAuditParameterButtonContainer >
      <AddNameInput
        isAdding={isAddingMode}
        value={auditParameterName}
        onChange={handleNameChange}
        onBlur={handleBlur}
        ref={nameInputRef}
        placeholder={intl.formatMessage({id: 'ProjectSettings.audit_parameter_name_placeholder'})}
      />
      <Select
        value={availableAuditParameters.find(auditParametersOption => {
          return auditParametersOption.uuid === auditParameterConfigurationId;
        })}
        onChange={handleConfigurationChange}
        options={availableAuditParameters}
        display={isAddingMode ? 'visible' : 'none'}
        width="40%"
        margin={selectMargin}
        onBlur={handleBlur}
        placeholder={intl.formatMessage({id: 'ProjectSettings.audit_parameter_configuration_placeholder'})}
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
        onBlur={handleBlur}
        placeholder={intl.formatMessage({id: 'ProjectSettings.audit_parameter_network_shape_placeholder'})}
      />
    </React.Fragment>
  )
}
