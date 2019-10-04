import Close from 'icons/Close';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { AuditParametersType } from 'redux/entities/auditParameters/types';
import { colorUsage } from 'stylesheet';
import { AuditParameterDeleteButton, AuditParameterDeleteContainer, EditBrowserInput, EditNameInput, EditNetworkShapeInput } from '../AuditParameterTable.style';

export interface  OwnProps {
  auditParameterId: string,
  projectId: string,
  disabled: boolean,
}

type Props = {
  auditParameter?: AuditParametersType | null,
  editAuditParameterRequest: (projectId: string, auditParameter: {name: string, uuid: string}) => void,
  deleteAuditParameterOfProjectRequest: (projectId: string, auditParameterId: string) => void;
} & OwnProps & InjectedIntlProps;

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

  React.useEffect(
    () => {
      if(auditParameter) {
        setAuditParameterName(auditParameter.name);
      }
    },
    [auditParameter],
    );

  const handleBlur = () => {
    if(auditParameter && (auditParameterName !== auditParameter.name)) {
      editAuditParameterRequest(
        projectId,
        {
          uuid: auditParameter.uuid,
          name: auditParameterName,
        })
      }
  };

  const handleNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setAuditParameterName(e.currentTarget.value)
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

  return (
    <React.Fragment>
      <EditNameInput
        disabled={disabled}
        value={auditParameterName}
        onChange={handleNameChange}
        onBlur={handleBlur}
      />
      <EditBrowserInput
        disabled={disabled}
        value={auditParameterName}
        onChange={handleNameChange}
        onBlur={handleBlur}
      />
      <EditNetworkShapeInput
        disabled={disabled}
        value={auditParameterName}
        onChange={handleNameChange}
        onBlur={handleBlur}
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
