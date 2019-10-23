import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import ReduxToastr, { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { RouteComponentProps } from 'react-router';
import { PageType } from 'redux/entities/pages/types';
import { ProjectToastrDisplayType, ProjectType } from 'redux/entities/projects/types';
import { useFetchProjectIfUndefined } from 'redux/entities/projects/useFetchProjectIfUndefined';
import { UserState } from 'redux/user';
import { isUserAdminOfProject } from 'services/utils';
import PageTable from './Components/PageTable';
import { AddScript, ScriptRow, ScriptTableHeader } from './Components/ScriptTable'
import Style from './PagesAndScriptsSettings.style';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
}>;

type Props = {
  currentUser: UserState,
  fetchProjectsRequest: (projectId: string) => void;
  project?: ProjectType | null;
  toastrDisplay: ProjectToastrDisplayType;
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) => void;
  addPageToProjectRequest: (projectId: string, pageName: string, pageUrl: string) => void;
  editPageRequest: (projectId: string, page: PageType) => void;
  deletePageOfProjectRequest: (projectId: string, pageId: string) => void;
} & OwnProps &
  InjectedIntlProps;

const PagesAndScriptsSettings: React.FunctionComponent<Props> = ({
  fetchProjectsRequest,
  match,
  intl,
  project,
  currentUser,
  toastrDisplay,
  setProjectToastrDisplay,
  addPageToProjectRequest,
  editPageRequest,
  deletePageOfProjectRequest,
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
  }


  useFetchProjectIfUndefined(fetchProjectsRequest, match.params.projectId, project);

  React.useEffect(
    () => {
      if ('' !== toastrDisplay) {
        switch (toastrDisplay) {
          case "addPageSuccess":
            toastr.success(
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.add_page_success_message' }),
            );
            break;
          case "editPageSuccess":
            toastr.success(
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.edit_page_success_message' }),
            );
            break;
          case "deletePageSuccess":
            toastr.success(
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.delete_page_success_message' }),
            );
            break;
          case "addScriptToProjectSuccess":
            toastr.success(
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.add_script_to_project_sucess' }),
            );
            break;
          case "editScriptSuccess":
            toastr.success(
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.edit_script_sucess' }),
            );
            break;
          case "deleteScriptSuccess":
            toastr.success(
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ 'id': 'Toastr.ProjectSettings.delete_script_sucess' }),
            );
            break;
          case "addScriptToProjectError":
          case "editScriptError":
          case "deleteScriptError":
          case "editPageError":
          case "addPageError":
          case "deletePageError":
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
        <FormattedMessage id="ProjectSettings.pages" />
      </Style.PageSubTitle>

      <PageTable
        currentUser={currentUser}
        project={project}
        add={addPageToProjectRequest}
        edit={editPageRequest}
        del={deletePageOfProjectRequest}
      />

      <Style.PageSubTitle>
        <FormattedMessage id="ProjectSettings.scripts" />
      </Style.PageSubTitle>
      <Style.ProjectSettingsBlock>
        <Style.ElementContainer>
          <ScriptTableHeader />
        </Style.ElementContainer>
        {project.scriptsIds.map(scriptId => (
          <Style.ElementContainer key={scriptId}>
            <ScriptRow
              scriptId={scriptId}
              projectId={project.uuid}
            />
          </Style.ElementContainer>))}
        {isUserAdminOfProject(currentUser, project) && <Style.ElementContainer>
          <AddScript projectId={project.uuid} />
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

export default PagesAndScriptsSettings;
