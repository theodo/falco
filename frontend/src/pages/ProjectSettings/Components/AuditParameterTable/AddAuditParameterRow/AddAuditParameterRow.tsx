import { Add } from 'icons';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { availableNetworkShape } from 'redux/entities/auditParameters/types'
import { makeGetRequest } from 'services/networking/request';
import { colorUsage } from 'stylesheet';
import { getSpacing } from 'stylesheet';
import Select from '../../../../../components/Select/Select';
import { AddAuditParameterButtonContainer, AddAuditParameterButtonLabel, AddNameInput } from '../AuditParameterTable.style';

export interface  OwnProps {
  projectId: string,
}

export interface ApiAvailableAuditParameters {
  uuid: string,
  browser: string,
  location_label: string,
  location_group: string,
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
  intl
  }) => {
  const [auditParameterName, setAuditParameterName] = React.useState('');
  const [auditParameterConfigurationId, setAuditParameterConfigurationId] = React.useState('')
  const [auditParameterNetworkShape, setAuditParameterNetworkShape] = React.useState('')
  const [availableAuditParameters, setAvailableAuditParameters] = React.useState<Array<{label: string, uuid: string}>>([])
  const [isAddingMode, setAddingMode] = React.useState(false);
  const [nameInputRef, setNameInputFocus] = useFocus();

  const modelizeAvailableAuditParameters = (apiAvailableAuditParameters: ApiAvailableAuditParameters) => ({
    label: `${apiAvailableAuditParameters.location_label}. ${apiAvailableAuditParameters.browser}`,
    uuid: apiAvailableAuditParameters.uuid,
  });

  const fetchAvailableAuditParameters = () => {
    const request = makeGetRequest('/api/projects/available_audit_parameters', true);
    request
      .then((response) => {
        if(response) {
          setAvailableAuditParameters(response.body.map((apiAvailableAuditParameters: ApiAvailableAuditParameters) => modelizeAvailableAuditParameters(apiAvailableAuditParameters)));
        }
      })
  }

  React.useEffect(
    () => {
      fetchAvailableAuditParameters();
    },
    [],
  );

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

  const handleBrowserChange = (e: any) => {
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
        onChange={handleBrowserChange}
        options={availableAuditParameters}
        display={isAddingMode ? 'visible' : 'none'}
        width="40%"
        margin={selectMargin}
        onBlur={handleBlur}
        placeholder={intl.formatMessage({id: 'ProjectSettings.audit_parameter_browser_placeholder'})}
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
