import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import ReduxToastr, { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { RouteComponentProps } from 'react-router';
import { ProjectToastrDisplayType, ProjectType } from 'redux/entities/projects/types';
import { useFetchProjectIfUndefined } from 'redux/entities/projects/useFetchProjectIfUndefined';
import { UserState } from 'redux/user';
import { makeGetRequest } from 'services/networking/request';
import { isUserAdminOfProject } from 'services/utils';
import AuditParameterRow, { AddAuditParameterRow } from './Components/AuditParameterTable'
import Style from './EnvironmentSettings.style';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
}>;

type Props = {
  currentUser: UserState,
  fetchProjectsRequest: (projectId: string) => void;
  project?: ProjectType | null;
  toastrDisplay: ProjectToastrDisplayType;
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) => void;
} & OwnProps &
  InjectedIntlProps;

const EnvironmentSettings: React.FunctionComponent<Props> = ({
  fetchProjectsRequest,
  match,
  intl,
  project,
  currentUser,
  toastrDisplay,
  setProjectToastrDisplay,
}) => {

  interface UserOption {
    value: string;
    label: string;
    disabled: boolean;
  };

  interface ApiAvailableAuditParameters {
    uuid: string,
    browser: string,
    location_label: string,
    location_group: string,
    wpt_instance_url: string,
  }


  useFetchProjectIfUndefined(fetchProjectsRequest, match.params.projectId, project);

  const [availableAuditParameters, setAvailableAuditParameters] = React.useState<Array<{label: string, uuid: string, wptInstanceURL: string}>>([])

  const modelizeAvailableAuditParameters = (apiAvailableAuditParameters: ApiAvailableAuditParameters) => ({
    label: `${apiAvailableAuditParameters.location_label}. ${apiAvailableAuditParameters.browser}`,
    uuid: apiAvailableAuditParameters.uuid,
    wptInstanceURL: apiAvailableAuditParameters.wpt_instance_url
  });

  React.useEffect(
    () => {
      const request = makeGetRequest('/api/projects/available_audit_parameters', true);
      request
      .then((response) => {
        if(response) {
          setAvailableAuditParameters(
            response.body
            .map((apiAvailableAuditParameters: ApiAvailableAuditParameters) => 
              modelizeAvailableAuditParameters(apiAvailableAuditParameters)
            )
          );
        }
      })
    },
    [],
  );

  React.useEffect(
    () => {
      if('' !== toastrDisplay) {
        switch(toastrDisplay) {
          case "addAuditParameterSuccess":
            toastr.success(
              intl.formatMessage({'id': 'Toastr.ProjectSettings.success_title'}),
              intl.formatMessage({'id': 'Toastr.ProjectSettings.add_audit_parameter_to_project_success'}),
            );
            break;
          case "editAuditParameterSuccess":
            toastr.success(
              intl.formatMessage({'id': 'Toastr.ProjectSettings.success_title'}),
              intl.formatMessage({'id': 'Toastr.ProjectSettings.edit_audit_parameter_success'}),
              );
            break;
          case "deleteAuditParameterSuccess":
            toastr.success(
              intl.formatMessage({'id': 'Toastr.ProjectSettings.success_title'}),
              intl.formatMessage({'id': 'Toastr.ProjectSettings.delete_audit_parameter_success'}),
              );
            break;
          case "addAuditParameterError":
          case "deleteAuditParameterError":
          case "editAuditParameterError":
            toastr.error(
              intl.formatMessage({'id': 'Toastr.ProjectSettings.error_title'}),
              intl.formatMessage({'id': 'Toastr.ProjectSettings.error_message'}),
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

  const filteredAvailableProjectsParameters = availableAuditParameters.filter(
    availableAuditParameter => availableAuditParameter.wptInstanceURL === project.wptInstanceURL
  )

  return (
    <Style.Container>
      <Style.PageTitle>{intl.formatMessage({ id: 'ProjectSettings.settings'}) + ' - ' + project.name}</Style.PageTitle>
      <Style.PageSubTitle>
        <FormattedMessage id="ProjectSettings.project_audit_parameters"/>
      </Style.PageSubTitle>
      <Style.ProjectSettingsBlock>
        <Style.ElementContainer>
          <Style.AuditParameterName>{intl.formatMessage({ id: "ProjectSettings.audit_parameter_name"})}</Style.AuditParameterName>
          <Style.Configuration>{intl.formatMessage({ id: "ProjectSettings.configuration"})}</Style.Configuration>
          <Style.NetworkShape>
            {intl.formatMessage({ id: "ProjectSettings.network_type"})}
          </Style.NetworkShape>
        </Style.ElementContainer>
        {project.auditParametersIds.map(auditParameterId => (
          <Style.ElementContainer key={auditParameterId}>
            <AuditParameterRow
              disabled={!isUserAdminOfProject(currentUser, project)}
              projectId={project.uuid}
              auditParameterId={auditParameterId}
              availableAuditParameters={filteredAvailableProjectsParameters}
            />
          </Style.ElementContainer>))}
        {isUserAdminOfProject(currentUser, project) && <Style.ElementContainer>
            <AddAuditParameterRow
              projectId={project.uuid}
              availableAuditParameters={filteredAvailableProjectsParameters}
            />
          </Style.ElementContainer>}
      </Style.ProjectSettingsBlock>
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
