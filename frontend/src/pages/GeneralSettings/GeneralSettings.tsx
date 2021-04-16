import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ReduxToastr, { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { RouteComponentProps } from 'react-router';
import { useProjectById, useToastr } from 'redux/entities/projects/hooks';
import { useCurrentUser } from 'redux/user/selectors';
import ProjectDetailsInput from './Components/ProjectDetailsInput';
import {
  Container,
  ExplanationText,
  PageTitle,
  SettingsFieldContainer,
  Title,
} from './GeneralSettings.style';

type Props = {
  editProjectDetailsRequest: (
    projectId: string,
    payload: { name: string; wpt_api_key: string; wpt_instance_url: string },
  ) => void;
} & RouteComponentProps<{
  projectId: string;
}>;

const GeneralSettings: React.FunctionComponent<Props> = ({ match, editProjectDetailsRequest }) => {
  const intl = useIntl();
  const currentUser = useCurrentUser();
  const { currentToastrDisplay, resetToastrDisplay } = useToastr();

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
  }

  const project = useProjectById(match.params.projectId);

  const [projectName, setProjectName] = React.useState('');
  const [projectApiKey, setProjectApiKey] = React.useState('');
  const [projectInstanceURL, setProjectInstanceURL] = React.useState('');

  React.useEffect(() => {
    setProjectName(project ? project.name : '');
    setProjectApiKey(project ? project.wptApiKey : '');
    setProjectInstanceURL(project ? project.wptInstanceURL : '');
  }, [project]);

  React.useEffect(() => {
    if ('' !== currentToastrDisplay) {
      switch (currentToastrDisplay) {
        case 'editProjectDetailsSuccess':
          toastr.success(
            intl.formatMessage({ id: 'Toastr.ProjectSettings.success_title' }),
            intl.formatMessage({ id: 'Toastr.ProjectSettings.edit_project_details_success' }),
          );
          break;
        case 'editProjectDetailsError':
          toastr.error(
            intl.formatMessage({ id: 'Toastr.ProjectSettings.error_title' }),
            intl.formatMessage({ id: 'Toastr.ProjectSettings.error_message' }),
          );
          break;
      }

      resetToastrDisplay();
    }
  }, [currentToastrDisplay, resetToastrDisplay, intl]);

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

  const handleNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setProjectName(e.currentTarget.value);
  };

  const handleApiKeyChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setProjectApiKey(e.currentTarget.value);
  };

  const handleInstanceURLChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setProjectInstanceURL(e.currentTarget.value);
  };

  const sendEditRequestOnBlur = () => {
    editProjectDetailsRequest(project.uuid, {
      name: projectName,
      wpt_api_key: projectApiKey,
      wpt_instance_url: projectInstanceURL,
    });
  };

  return (
    <Container>
      <PageTitle>
        <FormattedMessage id="ProjectSettings.settings" /> - {project.name}
      </PageTitle>
      <Title>
        <FormattedMessage id="ProjectSettings.general_settings" />
      </Title>
      <SettingsFieldContainer>
        <ProjectDetailsInput
          label="ProjectSettings.name"
          onChange={handleNameChange}
          onBlur={sendEditRequestOnBlur}
          value={projectName}
        />
      </SettingsFieldContainer>
      <SettingsFieldContainer>
        <ProjectDetailsInput
          label="ProjectSettings.wpt_key"
          onChange={handleApiKeyChange}
          onBlur={sendEditRequestOnBlur}
          value={projectApiKey}
        />
      </SettingsFieldContainer>
      <SettingsFieldContainer>
        <ProjectDetailsInput
          label="ProjectSettings.wpt_instance_url"
          onChange={handleInstanceURLChange}
          onBlur={sendEditRequestOnBlur}
          value={projectInstanceURL}
        />
      </SettingsFieldContainer>
      <ExplanationText>
        <FormattedMessage id="ProjectSettings.wpt_instance_url_explanation" />
      </ExplanationText>
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

export default GeneralSettings;
