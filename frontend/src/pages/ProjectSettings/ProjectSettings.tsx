import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { ValueType } from 'react-select/lib/types';
import { ProjectType } from 'redux/entities/projects/types';

import Badge from 'components/Badge';
import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import { useFetchProjectIfUndefined } from 'redux/entities/projects/useFetchProjectIfUndefined';
import { modelizeUser } from 'redux/user/modelizer';
import { ApiUser, User } from 'redux/user/types';
import { makeGetRequest } from 'services/networking/request';
import { colorUsage } from 'stylesheet';
import Style from './ProjectSettings.style';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
}>;

type Props = {
  addMemberToProject: (projectId: string, userId: string) => void;
  fetchProjectsRequest: (projectId: string) => void;
  project?: ProjectType | null;
} & OwnProps &
  InjectedIntlProps;

const ProjectSettings: React.FunctionComponent<Props> = ({
  fetchProjectsRequest,
  addMemberToProject,
  match,
  intl,
  project,
}) => {
  interface DisplayedUser {
    isAdmin: boolean,
    id: string,
    emailAddress: string,
    username: string
  }

  interface UserOption {
    value: string;
    label: string;
    disabled: boolean;
  };

  useFetchProjectIfUndefined(fetchProjectsRequest, match.params.projectId, project);

  const [allUsers, setAllUsers] = React.useState([]);
  const [projectUsers, setProjectUsers]: [DisplayedUser[], any] = React.useState([]);

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
      if(project) {
        setProjectUsers(mergeAdminsAndMembers(project.admins, project.members))
      }
    },
    [project],
  );

  React.useEffect(
    () => {
      fetchAllUsers();
    },
    [],
  );

  const onChange = (selectedOption: ValueType<UserOption | {}>) => {
    if(selectedOption && 'value' in selectedOption && project) {
      addMemberToProject(project.uuid, selectedOption.value);
    }
  }

  const projectMembersSelectOptions = allUsers && projectUsers && allUsers.map((member: User) => {
    const memberInProject = projectUsers.map((projectUser: DisplayedUser) => projectUser.id).includes(member.id);

    return {
      value: member.id,
      label: member.username + (memberInProject ? intl.formatMessage({ id: 'ProjectSettings.member_in_project'}) : ''),
      disabled: memberInProject,
    }
  }).sort((a, b) => +a.disabled - +b.disabled); // display the disabled elements at the end :
  // we cast the disabled properties to int using the + operator and we make the difference between the two.

  const mergeAdminsAndMembers = (admins: User[], members: User[]) =>
  {
    const allMembers: DisplayedUser[] = [];
    const adminUsernames: string[] = [];
    admins.forEach(admin => {
      allMembers.push({...admin, isAdmin: true})
      adminUsernames.push(admin.username)
    })
    members.forEach(member => {
      if(!adminUsernames.includes(member.username)) {
        allMembers.push({...member, isAdmin: false})
      }
    })
    return allMembers;
  }

  if (project === undefined) {
    return (
      <Style.Container>
        <Loader />
      </Style.Container>
    );
  }

  if (project === null) {
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
      <Style.PageTitle>{project.name}</Style.PageTitle>
      <Style.Title>
        <FormattedMessage id="ProjectSettings.settings"/>
      </Style.Title>
      <Style.PageSubTitle>
        <FormattedMessage id="ProjectSettings.project_members"/>
      </Style.PageSubTitle>
      <Style.SelectUser
        placeholder={intl.formatMessage({ id: "ProjectSettings.add_member" })}
        options={projectMembersSelectOptions}
        onChange={onChange}
        isOptionDisabled={(option: UserOption) => option.disabled}
      />
      <Style.ProjectMembersBlock>
        {projectUsers.map((user: DisplayedUser) => 
          <Style.ProjectMemberContainer key={user.username}>
            <Style.MemberUsername>{user.username}</Style.MemberUsername>
            <Style.MemberEmail>{user.emailAddress}</Style.MemberEmail>
            <Style.MemberAdminBadgeContainer>
              {user.isAdmin && <Badge
                backgroundColor={colorUsage.adminBadgeBackground}
                color={colorUsage.adminBadgeText}
                text={intl.formatMessage({id: "ProjectSettings.admin"}).toUpperCase()}
              />}
            </Style.MemberAdminBadgeContainer>
            <Style.MemberAdminCloseContainer />
          </Style.ProjectMemberContainer>
        )}
      </Style.ProjectMembersBlock>
    </Style.Container>
  );
}

export default ProjectSettings;
