import Badge from 'components/Badge';
import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import ToggleButton from 'components/ToggleButton';
import Close from 'icons/Close';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ReduxToastr, { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { RouteComponentProps } from 'react-router';
import { ValueType } from 'react-select/lib/types';
import { useProjectById, useToastr } from 'redux/entities/projects/hooks';
import { ProjectMember } from 'redux/entities/projects/types';
import { modelizeUser } from 'redux/user/modelizer';
import { useCurrentUser } from 'redux/user/selectors';
import { ApiUser, User } from 'redux/user/types';
import { makeGetRequest } from 'services/networking/request';
import { isUserAdminOfProject } from 'services/utils';
import { colorUsage } from 'stylesheet';
import {
  Container,
  ElementContainer,
  InviteUserLink,
  MemberAdminBadgeContainer,
  MemberAdminDeleteButton,
  MemberAdminDeleteContainer,
  MemberEmail,
  MemberUsername,
  PageSubTitle,
  PageTitle,
  ProjectSettingsBlock,
  SelectUser,
} from './MembersSettings.style';

type Props = {
  addMemberToProject: (projectId: string, userId: string) => void;
  removeMemberOfProjectRequest: (projectId: string, userId: string) => void;
  editMemberOfProjectRequest: (projectId: string, userId: string, isAdmin: boolean) => void;
} & RouteComponentProps<{
  projectId: string;
}>;

const MembersSettings: React.FunctionComponent<Props> = ({
  addMemberToProject,
  removeMemberOfProjectRequest,
  editMemberOfProjectRequest,
  match,
}) => {
  const intl = useIntl();

  interface UserOption {
    value: string;
    label: string;
    disabled: boolean;
  }

  const currentUser = useCurrentUser();

  const { currentToastrDisplay, resetToastrDisplay } = useToastr();

  const [selectOption, setSelectOption] = React.useState<ValueType<UserOption | {}>>(null);
  const [allUsers, setAllUsers] = React.useState([]);

  const project = useProjectById(match.params.projectId);

  const fetchAllUsers = () => {
    const request = makeGetRequest('/api/core/users', true);
    request.then(response => {
      if (response) {
        setAllUsers(response.body.map((apiUser: ApiUser) => modelizeUser(apiUser)));
      }
    });
  };

  React.useEffect(() => {
    fetchAllUsers();
  }, []);

  React.useEffect(
    () => {
      setSelectOption(null);
    },
    [project],
  );

  React.useEffect(
    () => {
      if ('' !== currentToastrDisplay) {
        switch (currentToastrDisplay) {
          case 'addMemberSuccess':
            toastr.success(
              intl.formatMessage({ id: 'Toastr.ProjectSettings.success_title' }),
              intl.formatMessage({ id: 'Toastr.ProjectSettings.add_member_success_message' }),
            );
            break;
          case 'addMemberError':
            toastr.error(
              intl.formatMessage({ id: 'Toastr.ProjectSettings.error_title' }),
              intl.formatMessage({ id: 'Toastr.ProjectSettings.error_message' }),
            );
            break;
        }

        resetToastrDisplay();
      }
    },
    [currentToastrDisplay, resetToastrDisplay, intl],
  );

  const onChange = (selectedOption: ValueType<UserOption | {}>) => {
    setSelectOption(selectedOption);
    if (selectedOption && 'value' in selectedOption && project) {
      addMemberToProject(project.uuid, selectedOption.value);
    }
  };

  const projectMembersSelectOptions =
    allUsers &&
    project &&
    allUsers
      .map((user: User) => {
        const memberInProject = project.projectMembers
          .map((projectMember: ProjectMember) => projectMember.id)
          .includes(user.id);

        return {
          value: user.id,
          label:
            `${user.username} - ${user.emailAddress}` +
            (memberInProject
              ? intl.formatMessage({ id: 'ProjectSettings.member_in_project' })
              : ''),
          disabled: memberInProject,
        };
      })
      .sort((a, b) => +a.disabled - +b.disabled); // display the disabled elements at the end :
  // we cast the disabled properties to int using the + operator and we make the difference between the two.

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

  const projectMembersWithCurrentUserFirst = project.projectMembers.sort((a, b) =>
    a.username === currentUser.username ? -1 : b.username === currentUser.username ? 1 : 0,
  );

  return (
    <Container>
      <PageTitle>
        <FormattedMessage id="ProjectSettings.settings" /> - {project.name}
      </PageTitle>
      <PageSubTitle>
        <FormattedMessage id="ProjectSettings.project_members" />
      </PageSubTitle>
      {isUserAdminOfProject(currentUser, project) && (
        <SelectUser
          placeholder={intl.formatMessage({ id: 'ProjectSettings.add_member' })}
          options={projectMembersSelectOptions}
          onChange={onChange}
          isOptionDisabled={(option: UserOption) => option.disabled}
          value={selectOption}
        />
      )}
      <InviteUserLink>
        <FormattedMessage id="ProjectSettings.member_not_on_falco" />
        <a href="/sign-up">
          {// small hack to get the page for the proper environment
          `${window.location.href.match(/https?:\/\/[^/]+/)}/sign-up`}
        </a>
      </InviteUserLink>
      <ProjectSettingsBlock>
        <ElementContainer>
          <MemberUsername>
            <FormattedMessage id="ProjectSettings.member_username" />
          </MemberUsername>
          <MemberEmail>
            <FormattedMessage id="ProjectSettings.member_email" />
          </MemberEmail>
          <MemberAdminBadgeContainer>
            <FormattedMessage id="ProjectSettings.member_status" />
          </MemberAdminBadgeContainer>
        </ElementContainer>
        {projectMembersWithCurrentUserFirst.map((projectMember: ProjectMember) => (
          <ElementContainer key={projectMember.username}>
            <MemberUsername>{projectMember.username}</MemberUsername>
            <MemberEmail>{projectMember.emailAddress}</MemberEmail>
            <MemberAdminBadgeContainer>
              {isUserAdminOfProject(currentUser, project) ? (
                <ToggleButton
                  onChange={() =>
                    editMemberOfProjectRequest(
                      project.uuid,
                      projectMember.id,
                      !projectMember.isAdmin,
                    )
                  }
                  checked={projectMember.isAdmin}
                  disabled={projectMember.username === currentUser.username}
                  label={intl.formatMessage({ id: 'ProjectSettings.admin' })}
                />
              ) : (
                projectMember.isAdmin && (
                  <Badge
                    backgroundColor={colorUsage.adminBadgeBackground}
                    color={colorUsage.adminBadgeText}
                    text={intl.formatMessage({ id: 'ProjectSettings.admin' }).toUpperCase()}
                  />
                )
              )}
            </MemberAdminBadgeContainer>
            <MemberAdminDeleteContainer>
              {isUserAdminOfProject(currentUser, project) &&
                projectMember.username !== currentUser.username && (
                  <MemberAdminDeleteButton
                    onClick={() => removeMemberOfProjectRequest(project.uuid, projectMember.id)}
                  >
                    <Close
                      color={colorUsage.projectSettingsIconColor}
                      width="13px"
                      strokeWidth="15"
                    />
                  </MemberAdminDeleteButton>
                )}
            </MemberAdminDeleteContainer>
          </ElementContainer>
        ))}
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

export default MembersSettings;
