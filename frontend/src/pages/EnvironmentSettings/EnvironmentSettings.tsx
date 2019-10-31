import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import ReduxToastr, { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { RouteComponentProps } from 'react-router';
import { AuditParametersType } from 'redux/entities/auditParameters/types';
import { ProjectToastrDisplayType, ProjectType } from 'redux/entities/projects/types';
import { useFetchProjectIfUndefined } from 'redux/entities/projects/useFetchProjectIfUndefined';
import { UserState } from 'redux/user';
import ProjectAuditParameterTable from '../../components/AuditParameterTable';
import Style from './EnvironmentSettings.style';

import { isUserAdminOfProject } from 'services/utils';
export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
}>;

type Props = {
  currentUser: UserState,
  fetchProjectsRequest: (projectId: string) => void;
  project?: ProjectType | null;
  toastrDisplay: ProjectToastrDisplayType;
  auditParameters: AuditParametersType[] | undefined;
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) => void;
  addAuditParameterToProjectRequest: (projectId: string, auditParameterName: string, auditParameterNetworkShape: string, auditParameterConfigurationId: string) => void;
  editAuditParameterRequest: (projectId: string, auditParameter: { name: string, uuid: string, configuration_id: string, network_shape: string }) => void;
  deleteAuditParameterFromProjectRequest: (projectId: string, auditParameterId: string) => void;
} & OwnProps &
  InjectedIntlProps;

const EnvironmentSettings: React.FunctionComponent<Props> = ({
  fetchProjectsRequest,
  match,
  intl,
  project,
  currentUser,
  toastrDisplay,
  auditParameters,
  setProjectToastrDisplay,
  addAuditParameterToProjectRequest,
  editAuditParameterRequest,
  deleteAuditParameterFromProjectRequest,
}) => {



  useFetchProjectIfUndefined(fetchProjectsRequest, match.params.projectId, project);


  const handleAuditParameterDeletion = (auditParameterId: string) => {
    if (!project) { return null }
    toastr.confirm(intl.formatMessage({ id: 'Toastr.ProjectSettings.delete_auditParameter_confirm_question' }),
      {
        onOk: () => deleteAuditParameterFromProjectRequest(project.uuid, auditParameterId)

      })
  }

  React.useEffect(
    () => {
      if ('' !== toastrDisplay) {
        switch (toastrDisplay) {
          case "addAuditParameterSuccess":
            toastr.success(
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.add_audit_parameter_to_project_success' }),
            );
            break;
          case "editAuditParameterSuccess":
            toastr.success(
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.edit_audit_parameter_success' }),
            );
            break;
          case "deleteAuditParameterSuccess":
            toastr.success(
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.delete_audit_parameter_success' }),
            );
            break;
          case "addAuditParameterError":
          case "deleteAuditParameterError":
          case "editAuditParameterError":
            toastr.error(
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.error_title' }),
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.error_message' }),
            );
            break;
        }

        setProjectToastrDisplay('');
      }
    },
    [toastrDisplay, setProjectToastrDisplay, intl],
  );


  if (project === undefined) {
    return (
      <Style.Container>
        <Loader />
      </Style.Container>
    );
  }

  if (project === null || currentUser === null) {
    return (
      <Style.Container>
        <MessagePill messageType="error">
          <FormattedMessage id="Project.project_error" />
        </MessagePill>
      </Style.Container>
    );
  }

  return (
    <Style.Container>
      <Style.PageTitle>{intl.formatMessage({ id: 'ProjectSettings.settings' }) + ' - ' + project.name}</Style.PageTitle>
      <Style.PageSubTitle>
        <FormattedMessage id="ProjectSettings.project_audit_parameters" />
      </Style.PageSubTitle>

      <ProjectAuditParameterTable
        auditParameters={auditParameters}
        disabled={!isUserAdminOfProject(currentUser, project)}
        add={(auditParameterName: string, auditParameterNetworkShape: string, auditParameterConfigurationId: string) => addAuditParameterToProjectRequest(project.uuid, auditParameterName, auditParameterNetworkShape, auditParameterConfigurationId)}
        edit={(auditParameter: { name: string, uuid: string, configuration_id: string, network_shape: string }) => editAuditParameterRequest(project.uuid, auditParameter)}
        del={(auditParameterId: string) => handleAuditParameterDeletion(auditParameterId)}
      />

      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        closeOnToastrClick
      />
    </Style.Container>
  );
}

export default EnvironmentSettings;
