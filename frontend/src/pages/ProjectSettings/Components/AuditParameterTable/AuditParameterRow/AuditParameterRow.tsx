import Select from 'components/Select';
import Close from 'icons/Close';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { availableNetworkShape } from 'redux/entities/auditParameters/types'
import { AuditParametersType } from 'redux/entities/auditParameters/types';
import { makeGetRequest } from 'services/networking/request';
import { colorUsage } from 'stylesheet';
import { getSpacing } from 'stylesheet';
import { AuditParameterDeleteButton, AuditParameterDeleteContainer, EditBrowserInput, EditNameInput, EditNetworkShapeInput } from '../AuditParameterTable.style';

export interface  OwnProps {
  auditParameterId: string,
  projectId: string,
  disabled: boolean,
}

export interface ApiAvailableAuditParameters {
  uuid: string,
  browser: string,
  location_label: string,
  location_group: string,
}

type Props = {
  auditParameter?: AuditParametersType | null,
  editAuditParameterRequest: (projectId: string, auditParameter: {name: string, uuid: string, configuration_id: string, network_shape: string}) => void,
  deleteAuditParameterOfProjectRequest: (projectId: string, auditParameterId: string) => void;
} & OwnProps & InjectedIntlProps;

interface NetworkShapeOptionType {
  label: string,
  value: string,
}

export const AuditParameterRow: React.FunctionComponent<Props> = ({
  auditParameterId,
  auditParameter,
  projectId,
  editAuditParameterRequest,
  disabled,
  deleteAuditParameterOfProjectRequest,
  intl
  }) => {
  const [auditParameterName, setAuditParameterName] = React.useState('');
  const [auditParameterBrowser, setAuditParameterBrowser] = React.useState('');
  const [auditParameterNetworkShape, setAuditParameterNetworkShape] = React.useState('');
  const [availableAuditParameters, setAvailableAuditParameters] = React.useState<Array<{label: string, uuid: string}>>([])
  const [auditParameterConfigurationId, setAuditParameterConfigurationId] = React.useState('')


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
      if(auditParameter) {
        setAuditParameterName(auditParameter.name);
        setAuditParameterBrowser(auditParameter.configurationId);
        setAuditParameterNetworkShape(auditParameter.networkShape);
      }
    },
    [auditParameter],
    );

  const handleBlur = () => {
    if(auditParameter && (auditParameterName !== auditParameter.name || auditParameterBrowser !== auditParameter.configurationId || auditParameter.networkShape !== auditParameterNetworkShape)) {
      editAuditParameterRequest(
        projectId,
        {
          uuid: auditParameter.uuid,
          name: auditParameterName,
          configuration_id: auditParameterBrowser,
          network_shape: auditParameterNetworkShape,
        })
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

  const handleAuditParameterDeletion = (currentProjectId: string, targetAuditParameterId: string) => {
    toastr.confirm(intl.formatMessage({ id: 'Toastr.ProjectSettings.delete_auditParameter_confirm_question'}),
    {
      onOk: () => deleteAuditParameterOfProjectRequest(currentProjectId, targetAuditParameterId)
    })
  }

  if(null === auditParameter || undefined === auditParameter) {
    return(null);
  };

  const selectMargin = `0 ${getSpacing(2)} 0 0`

  return (
    <React.Fragment>
      <EditNameInput
        disabled={disabled}
        value={auditParameterName}
        onChange={handleNameChange}
        onBlur={handleBlur}
      />
      <Select
        value={availableAuditParameters.find(auditParametersOption => {
          return auditParametersOption.uuid === auditParameterBrowser;
        })}
        onChange={handleBrowserChange}
        options={availableAuditParameters}
        margin={selectMargin}
        width="40%"
        onBlur={handleBlur}
        placeholder={intl.formatMessage({id: 'ProjectSettings.audit_parameter_browser_placeholder'})}
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
        placeholder={intl.formatMessage({id: 'ProjectSettings.audit_parameter_network_shape_placeholder'})}
      />
      <AuditParameterDeleteContainer>
        <AuditParameterDeleteButton onClick={() => handleAuditParameterDeletion(projectId, auditParameterId)}>
          <Close
            color={colorUsage.projectSettingsIconColor}
            width="13px"
            strokeWidth="20"
          />
        </AuditParameterDeleteButton>
      </AuditParameterDeleteContainer >
    </React.Fragment>
  )
}
