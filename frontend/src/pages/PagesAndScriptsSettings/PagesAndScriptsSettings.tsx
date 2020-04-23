import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ReduxToastr, { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { RouteComponentProps } from 'react-router';
import { useProjectById } from 'redux/entities/projects/hooks';
import { ProjectToastrDisplayType } from 'redux/entities/projects/types';
import { UserState } from 'redux/user';
import { isUserAdminOfProject } from 'services/utils';
import { AddPageRow } from './Components/PageTable';
import PageRow, { PageRowHeader } from './Components/PageTable';
import { AddScript, ScriptRow, ScriptTableHeader } from './Components/ScriptTable';
import {
  Container,
  ElementContainer,
  PageSubTitle,
  PageTitle,
  ProjectSettingsBlock,
} from './PagesAndScriptsSettings.style';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
}>;

type Props = {
  currentUser: UserState;
  toastrDisplay: ProjectToastrDisplayType;
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) => void;
} & OwnProps;

const PagesAndScriptsSettings: React.FunctionComponent<Props> = ({
  match,
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
  }

  const project = useProjectById(match.params.projectId);

  React.useEffect(
    () => {
      if ('' !== toastrDisplay) {
        switch (toastrDisplay) {
          case 'addPageSuccess':
            toastr.success(
              intl.formatMessage({ id: 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ id: 'Toastr.ProjectSettings.add_page_success_message' }),
            );
            break;
          case 'editPageSuccess':
            toastr.success(
              intl.formatMessage({ id: 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ id: 'Toastr.ProjectSettings.edit_page_success_message' }),
            );
            break;
          case 'deletePageSuccess':
            toastr.success(
              intl.formatMessage({ id: 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ id: 'Toastr.ProjectSettings.delete_page_success_message' }),
            );
            break;
          case 'addScriptToProjectSuccess':
            toastr.success(
              intl.formatMessage({ id: 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ id: 'Toastr.ProjectSettings.add_script_to_project_sucess' }),
            );
            break;
          case 'editScriptSuccess':
            toastr.success(
              intl.formatMessage({ id: 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ id: 'Toastr.ProjectSettings.edit_script_sucess' }),
            );
            break;
          case 'deleteScriptSuccess':
            toastr.success(
              intl.formatMessage({ id: 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ id: 'Toastr.ProjectSettings.delete_script_sucess' }),
            );
            break;
          case 'addScriptToProjectError':
          case 'editScriptError':
          case 'deleteScriptError':
          case 'editPageError':
          case 'addPageError':
          case 'deletePageError':
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

  return (
    <Container>
      <PageTitle>
        <FormattedMessage id="ProjectSettings.settings" /> - {project.name}
      </PageTitle>
      <PageSubTitle>
        <FormattedMessage id="ProjectSettings.pages" />
      </PageSubTitle>
      <ProjectSettingsBlock>
        <ElementContainer>
          <PageRowHeader />
        </ElementContainer>
        {project.pagesIds.map(pageId => (
          <ElementContainer key={pageId}>
            <PageRow
              disabled={!isUserAdminOfProject(currentUser, project)}
              projectId={project.uuid}
              pageId={pageId}
            />
          </ElementContainer>
        ))}
        {isUserAdminOfProject(currentUser, project) && (
          <ElementContainer>
            <AddPageRow projectId={project.uuid} />
          </ElementContainer>
        )}
      </ProjectSettingsBlock>
      <PageSubTitle>
        <FormattedMessage id="ProjectSettings.scripts" />
      </PageSubTitle>
      <ProjectSettingsBlock>
        <ElementContainer>
          <ScriptTableHeader />
        </ElementContainer>
        {project.scriptsIds.map(scriptId => (
          <ElementContainer key={scriptId}>
            <ScriptRow scriptId={scriptId} projectId={project.uuid} />
          </ElementContainer>
        ))}
        {isUserAdminOfProject(currentUser, project) && (
          <ElementContainer>
            <AddScript projectId={project.uuid} />
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

export default PagesAndScriptsSettings;
