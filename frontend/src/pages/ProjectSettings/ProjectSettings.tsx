import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { ValueType } from 'react-select/lib/types';
import { ProjectMember, ProjectToastrDisplayType, ProjectType } from 'redux/entities/projects/types';

import Badge from 'components/Badge';
import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import ToggleButton from 'components/ToggleButton';
import Close from 'icons/Close';
import { toastr } from 'react-redux-toastr';
import { useFetchProjectIfUndefined } from 'redux/entities/projects/useFetchProjectIfUndefined';
import { UserState } from 'redux/user';
import { modelizeUser } from 'redux/user/modelizer';
import { ApiUser, User } from 'redux/user/types';
import { makeGetRequest } from 'services/networking/request';
import { isUserAdminOfProject } from 'services/utils';
import { colorUsage } from 'stylesheet';
import AuditParameterRow, { AddAuditParameterRow } from './Components/AuditParameterTable'
import PageRow, { PageRowHeader } from './Components/PageTable';
import { AddPageRow } from './Components/PageTable';
import ProjectDetailsInput from './Components/ProjectDetailsInput';
import Style from './ProjectSettings.style';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
}>;

type Props = {
  currentUser: UserState,
  addMemberToProject: (projectId: string, userId: string) => void;
  removeMemberOfProjectRequest: (projectId: string, userId: string) => void;
  editMemberOfProjectRequest: (projectId: string, userId: string, isAdmin: boolean) => void;
  fetchProjectsRequest: (projectId: string) => void;
  project?: ProjectType | null;
  toastrDisplay: ProjectToastrDisplayType;
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) => void;
  editProjectDetailsRequest: (projectId: string, payload: {name: string, wpt_api_key: string}) => void;
} & OwnProps &
  InjectedIntlProps;

const ProjectSettings: React.FunctionComponent<Props> = ({
  fetchProjectsRequest,
  addMemberToProject,
  removeMemberOfProjectRequest,
  editMemberOfProjectRequest,
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
  };

  useFetchProjectIfUndefined(fetchProjectsRequest, match.params.projectId, project);

  const [selectOption, setSelectOption]: [ValueType<UserOption | {}>, any] = React.useState(null);
  const [allUsers, setAllUsers] = React.useState([]);
  const [projectName, setProjectName] = React.useState('');
  const [projectApiKey, setProjectApiKey] = React.useState('');

  const fetchAllUsers = () => {
    const request = makeGetRequest('/api/core/users', true);
    request
      .then((response) => {
        if(response) {
          setAllUsers(response.body.map((apiUser:ApiUser) => modelizeUser(apiUser)));
        }
      })
  }

  React.useEffect(
    () => {
      setProjectName(project ? project.name : '');
      setProjectApiKey(project ? project.wptApiKey : '');
    },
    [project]
  )

  React.useEffect(
    () => {
      fetchAllUsers();
    },
    [],
  );

  React.useEffect(
    () => {
      setSelectOption(null);
    },
    [project],
  );

  React.useEffect(
    () => {
      if('' !== toastrDisplay) {
        switch(toastrDisplay) {
          case "editPageSuccess":
            toastr.success(
              intl.formatMessage({'id': 'Toastr.ProjectSettings.success_title'}),
              intl.formatMessage({'id': 'Toastr.ProjectSettings.edit_page_success_message'}),
            );
            break;
          case "addMemberSuccess":
            toastr.success(
              intl.formatMessage({'id': 'Toastr.ProjectSettings.success_title'}),
              intl.formatMessage({'id': 'Toastr.ProjectSettings.add_member_success_message'}),
            );
            break;
          case "addPageSuccess":
            toastr.success(
              intl.formatMessage({'id': 'Toastr.ProjectSettings.success_title'}),
              intl.formatMessage({'id': 'Toastr.ProjectSettings.add_page_success_message'}),
            );
            break;
          case "deletePageSuccess":
            toastr.success(
              intl.formatMessage({'id': 'Toastr.ProjectSettings.success_title'}),
              intl.formatMessage({'id': 'Toastr.ProjectSettings.delete_page_success_message'}),
            );
            break;
            case "editProjectDetailsSuccess":
              toastr.success(
                intl.formatMessage({'id': 'Toastr.ProjectSettings.success_title'}),
                intl.formatMessage({'id': 'Toastr.ProjectSettings.edit_project_details_success'}),
              );
              break;
            case "editProjectDetailsError":
              toastr.error(
                intl.formatMessage({'id': 'Toastr.ProjectSettings.error_title'}),
                intl.formatMessage({'id': 'Toastr.ProjectSettings.error_message'}),
              );
              break;
            case "addAuditParameterSuccess":
              toastr.success(
                intl.formatMessage({'id': 'Toastr.ProjectSettings.success_title'}),
                intl.formatMessage({'id': 'Toastr.ProjectSettings.add_audit_parameter_to_project_success'}),
              );
              break;
            case "addAuditParameterError":
              toastr.error(
                intl.formatMessage({'id': 'Toastr.ProjectSettings.error_title'}),
                intl.formatMessage({'id': 'Toastr.ProjectSettings.error_message'}),
              );
              break;
            case "editAuditParameterSuccess":
              toastr.success(
                intl.formatMessage({'id': 'Toastr.ProjectSettings.success_title'}),
                intl.formatMessage({'id': 'Toastr.ProjectSettings.add_audit_parameter_to_project_success'}),
              );
              break;
            case "editAuditParameterError":
              toastr.error(
                intl.formatMessage({'id': 'Toastr.ProjectSettings.success_title'}),
                intl.formatMessage({'id': 'Toastr.ProjectSettings.edit_audit_parameter_success'}),
              );
              break;
          case "addMemberError":
          case "editPageError":
          case "addPageError":
          case "deletePageError":
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

  const onChange = (selectedOption: ValueType<UserOption | {}>) => {
    setSelectOption(selectedOption);
    if(selectedOption && 'value' in selectedOption && project) {
      addMemberToProject(project.uuid, selectedOption.value);
    }
  }

  const projectMembersSelectOptions = allUsers && project && allUsers.map((user: User) => {
    const memberInProject = project.projectMembers.map((projectMember: ProjectMember) => projectMember.id).includes(user.id);

    return {
      value: user.id,
      label: user.username + (memberInProject ? intl.formatMessage({ id: 'ProjectSettings.member_in_project'}) : ''),
      disabled: memberInProject,
    }
  }).sort((a, b) => +a.disabled - +b.disabled); // display the disabled elements at the end :
  // we cast the disabled properties to int using the + operator and we make the difference between the two.

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

  // place current user first : see https://stackoverflow.com/questions/23921683/javascript-move-an-item-of-an-array-to-the-front
  const projectMembersWithCurrentUserFirst = project.projectMembers.sort((a, b) => a.username === currentUser.username ? -1 : b.username === currentUser.username ? 1 : 0)

  const handleNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setProjectName(e.currentTarget.value)
  }

  const handleApiKeyChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setProjectApiKey(e.currentTarget.value)
  }

  const sendEditRequestOnBlur = () => {
    editProjectDetailsRequest(
      project.uuid,
      {
        name: projectName,
        wpt_api_key: projectApiKey,
      },
    )
  };

  return (
    <Style.Container>
      <Style.PageTitle>{project.name}</Style.PageTitle>
      <Style.Title>
        <FormattedMessage id="ProjectSettings.settings"/>
      </Style.Title>
      <Style.PageSubTitle>
        <FormattedMessage id="ProjectSettings.general_settings"/>
      </Style.PageSubTitle>
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
            />
          </Style.ElementContainer>))}
        {isUserAdminOfProject(currentUser, project) && <Style.ElementContainer>
            <AddAuditParameterRow
              projectId={project.uuid}
            />
          </Style.ElementContainer>}
      </Style.ProjectSettingsBlock>
      <Style.PageSubTitle>
        <FormattedMessage id="ProjectSettings.pages"/>
      </Style.PageSubTitle>
      <Style.ProjectSettingsBlock>
        <Style.ElementContainer>
          <PageRowHeader />
        </Style.ElementContainer>
        {project.pagesIds.map(pageId => (
          <Style.ElementContainer key={pageId}>
            <PageRow
              disabled={!isUserAdminOfProject(currentUser, project)}
              projectId={project.uuid}
              pageId={pageId}
            />
          </Style.ElementContainer>))}
          {isUserAdminOfProject(currentUser, project) && <Style.ElementContainer>
            <AddPageRow
              projectId={project.uuid}
            />
          </Style.ElementContainer>}
      </Style.ProjectSettingsBlock>
      <Style.PageSubTitle>
        <FormattedMessage id="ProjectSettings.project_members"/>
      </Style.PageSubTitle>
      {isUserAdminOfProject(currentUser, project) && <Style.SelectUser
        placeholder={intl.formatMessage({ id: "ProjectSettings.add_member" })}
        options={projectMembersSelectOptions}
        onChange={onChange}
        isOptionDisabled={(option: UserOption) => option.disabled}
        value={selectOption}
      />}
      <Style.InviteUserLink>
        {intl.formatMessage({id: "ProjectSettings.member_not_on_falco"})}
        <a href="/sign-up">
          { // small hack to get the page for the proper environment
            `${window.location.href.match(/https?:\/\/[^/]+/)}/sign-up`}
        </a>
      </Style.InviteUserLink>
      <Style.ProjectSettingsBlock>
        <Style.ElementContainer>
          <Style.MemberUsername>{intl.formatMessage({ id: "ProjectSettings.member_username"})}</Style.MemberUsername>
          <Style.MemberEmail>{intl.formatMessage({ id: "ProjectSettings.member_email"})}</Style.MemberEmail>
          <Style.MemberAdminBadgeContainer>
            {intl.formatMessage({ id: "ProjectSettings.member_status"})}
          </Style.MemberAdminBadgeContainer>
        </Style.ElementContainer>
        {projectMembersWithCurrentUserFirst.map((projectMember: ProjectMember) =>
            <Style.ElementContainer key={projectMember.username}>
              <Style.MemberUsername>{projectMember.username}</Style.MemberUsername>
              <Style.MemberEmail>{projectMember.emailAddress}</Style.MemberEmail>
              <Style.MemberAdminBadgeContainer>
                {isUserAdminOfProject(currentUser, project)
                  ? <ToggleButton
                    onChange={() => editMemberOfProjectRequest(project.uuid, projectMember.id, !projectMember.isAdmin)}
                    checked={projectMember.isAdmin}
                    disabled={projectMember.username === currentUser.username}
                    label={intl.formatMessage({id: "ProjectSettings.admin"})}
                  />
                  : projectMember.isAdmin && <Badge
                    backgroundColor={colorUsage.adminBadgeBackground}
                    color={colorUsage.adminBadgeText}
                    text={intl.formatMessage({id: "ProjectSettings.admin"}).toUpperCase()}
                  />}
              </Style.MemberAdminBadgeContainer>
              <Style.MemberAdminDeleteContainer>
                  {isUserAdminOfProject(currentUser, project) && projectMember.username !== currentUser.username &&
                    (<Style.MemberAdminDeleteButton onClick={() => removeMemberOfProjectRequest(project.uuid, projectMember.id)}>
                      <Close
                        color={colorUsage.projectSettingsIconColor}
                        width="13px"
                        strokeWidth="20"
                      />
                    </Style.MemberAdminDeleteButton>)}
              </Style.MemberAdminDeleteContainer >
            </Style.ElementContainer>
          )}
      </Style.ProjectSettingsBlock>
    </Style.Container>
  );
}

export default ProjectSettings;
