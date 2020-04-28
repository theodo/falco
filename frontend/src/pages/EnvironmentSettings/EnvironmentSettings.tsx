import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ReduxToastr, { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { RouteComponentProps } from 'react-router';
import { ProjectToastrDisplayType, ProjectType } from 'redux/entities/projects/types';
import { useFetchProjectIfUndefined } from 'redux/entities/projects/useFetchProjectIfUndefined';
import { UserState } from 'redux/user';
import { makeGetRequest } from 'services/networking/request';
import { isUserAdminOfProject } from 'services/utils';
import AuditParameterRow, { AddAuditParameterRow } from './Components/AuditParameterTable';
import {
  AuditParameterName,
  Configuration,
  Container,
  ElementContainer,
  NetworkShape,
  PageSubTitle,
  PageTitle,
  ProjectSettingsBlock,
} from './EnvironmentSettings.style';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
}>;

type Props = {
  currentUser: UserState;
  fetchProjectsRequest: (projectId: string) => void;
  project?: ProjectType | null;
  toastrDisplay: ProjectToastrDisplayType;
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) => void;
} & OwnProps;

const EnvironmentSettings: React.FunctionComponent<Props> = ({
  fetchProjectsRequest,
  match,
  project,
  currentUser,
  toastrDisplay,
  setProjectToastrDisplay,
}) => {
  const intl = useIntl();

  interface UserOption {
    value: string;
    label: string;
    disabled: boolean;
  }

  interface ApiAvailableAuditParameters {
    uuid: string;
    browser: string;
    location_label: string;
    location_group: string;
    wpt_instance_url: string;
  }

  useFetchProjectIfUndefined(fetchProjectsRequest, match.params.projectId, project);

  const [availableAuditParameters, setAvailableAuditParameters] = React.useState<
    Array<{ label: string; uuid: string; wptInstanceURL: string }>
  >([]);

  const modelizeAvailableAuditParameters = (
    apiAvailableAuditParameters: ApiAvailableAuditParameters,
  ) => ({
    label: `${apiAvailableAuditParameters.location_label}. ${apiAvailableAuditParameters.browser}`,
    uuid: apiAvailableAuditParameters.uuid,
    wptInstanceURL: apiAvailableAuditParameters.wpt_instance_url,
  });

  React.useEffect(() => {
    const request = makeGetRequest('/api/projects/available_audit_parameters', true);
    request.then(response => {
      if (response) {
        setAvailableAuditParameters(
          response.body.map((apiAvailableAuditParameters: ApiAvailableAuditParameters) =>
            modelizeAvailableAuditParameters(apiAvailableAuditParameters),
          ),
        );
      }
    });
  }, []);

  React.useEffect(
    () => {
      if ('' !== toastrDisplay) {
        switch (toastrDisplay) {
          case 'addAuditParameterSuccess':
            toastr.success(
              intl.formatMessage({ id: 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({
                id: 'Toastr.ProjectSettings.add_audit_parameter_to_project_success',
              }),
            );
            break;
          case 'editAuditParameterSuccess':
            toastr.success(
              intl.formatMessage({ id: 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ id: 'Toastr.ProjectSettings.edit_audit_parameter_success' }),
            );
            break;
          case 'deleteAuditParameterSuccess':
            toastr.success(
              intl.formatMessage({ id: 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ id: 'Toastr.ProjectSettings.delete_audit_parameter_success' }),
            );
            break;
          case 'addAuditParameterError':
          case 'deleteAuditParameterError':
          case 'editAuditParameterError':
            toastr.error(
              intl.formatMessage({ id: 'Toastr.ProjectSettings.error_title' }),
              intl.formatMessage({ id: 'Toastr.ProjectSettings.error_message' }),
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
      <Container>
        <Loader />
      </Container>
    );
  }

  if (project === null || currentUser === null) {
    return (
      <Container>
        <MessagePill messageType="error">
          <FormattedMessage id="Project.project_error" />
        </MessagePill>
      </Container>
    );
  }

  const filteredAvailableProjectsParameters = availableAuditParameters.filter(
    availableAuditParameter => availableAuditParameter.wptInstanceURL === project.wptInstanceURL,
  );

  return (
    <Container>
      <PageTitle>
        <FormattedMessage id="ProjectSettings.settings" /> - {project.name}
      </PageTitle>
      <PageSubTitle>
        <FormattedMessage id="ProjectSettings.project_audit_parameters" />
      </PageSubTitle>
      <ProjectSettingsBlock>
        <ElementContainer>
          <AuditParameterName>
            <FormattedMessage id="ProjectSettings.audit_parameter_name" />
          </AuditParameterName>
          <Configuration>
            <FormattedMessage id="ProjectSettings.configuration" />
          </Configuration>
          <NetworkShape>
            <FormattedMessage id="ProjectSettings.network_type" />
          </NetworkShape>
        </ElementContainer>
        {project.auditParametersIds.map(auditParameterId => (
          <ElementContainer key={auditParameterId}>
            <AuditParameterRow
              disabled={!isUserAdminOfProject(currentUser, project)}
              projectId={project.uuid}
              auditParameterId={auditParameterId}
              availableAuditParameters={filteredAvailableProjectsParameters}
            />
          </ElementContainer>
        ))}
        {isUserAdminOfProject(currentUser, project) && (
          <ElementContainer>
            <AddAuditParameterRow
              projectId={project.uuid}
              availableAuditParameters={filteredAvailableProjectsParameters}
            />
          </ElementContainer>
        )}
      </ProjectSettingsBlock>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        closeOnToastrClick
      />
    </Container>
  );
};

export default EnvironmentSettings;
