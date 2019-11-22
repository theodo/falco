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
import ProjectDetailsInput from './Components/ProjectDetailsInput';
import Style from './GeneralSettings.style';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
}>;

type Props = {
  currentUser: UserState;
  fetchProjectsRequest: (projectId: string) => void;
  project?: ProjectType | null;
  toastrDisplay: ProjectToastrDisplayType;
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) => void;
  editProjectDetailsRequest: (
    projectId: string,
    payload: { name: string; wpt_api_key: string; wpt_instance_url: string },
  ) => void;
} & OwnProps &
  InjectedIntlProps;

const GeneralSettings: React.FunctionComponent<Props> = ({
  fetchProjectsRequest,
  match,
  intl,
  project,
  currentUser,
  toastrDisplay,
  setProjectToastrDisplay,
  editProjectDetailsRequest,
}) => {
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

  useFetchProjectIfUndefined(fetchProjectsRequest, match.params.projectId, project);

  const [projectName, setProjectName] = React.useState('');
  const [projectApiKey, setProjectApiKey] = React.useState('');
  const [projectInstanceURL, setProjectInstanceURL] = React.useState('');

  React.useEffect(
    () => {
      setProjectName(project ? project.name : '');
      setProjectApiKey(project ? project.wptApiKey : '');
      setProjectInstanceURL(project ? project.wptInstanceURL : '');
    },
    [project],
  );

  React.useEffect(
    () => {
      if ('' !== toastrDisplay) {
        switch (toastrDisplay) {
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
    <Style.Container>
      <Style.PageTitle>
        {intl.formatMessage({ id: 'ProjectSettings.settings' }) + ' - ' + project.name}
      </Style.PageTitle>
      <Style.Title>
        <FormattedMessage id="ProjectSettings.general_settings" />
      </Style.Title>
      <Style.SettingsFieldContainer>
        <ProjectDetailsInput
          label="ProjectSettings.name"
          onChange={handleNameChange}
          onBlur={sendEditRequestOnBlur}
          value={projectName}
        />
      </Style.SettingsFieldContainer>
      <Style.SettingsFieldContainer>
        <ProjectDetailsInput
          label="ProjectSettings.wpt_key"
          onChange={handleApiKeyChange}
          onBlur={sendEditRequestOnBlur}
          value={projectApiKey}
        />
      </Style.SettingsFieldContainer>
      <Style.SettingsFieldContainer>
        <ProjectDetailsInput
          label="ProjectSettings.wpt_instance_url"
          onChange={handleInstanceURLChange}
          onBlur={sendEditRequestOnBlur}
          value={projectInstanceURL}
        />
      </Style.SettingsFieldContainer>
      <Style.ExplanationText>
        {intl.formatMessage({id: "ProjectSettings.wpt_instance_url_explanation"})}
      </Style.ExplanationText>
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
};

export default GeneralSettings;
