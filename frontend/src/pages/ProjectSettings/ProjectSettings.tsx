import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';
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
  fetchProjectsRequest: (projectId: string) => void;
  project?: ProjectType | null;
} & OwnProps &
  InjectedIntlProps;

const ProjectSettings: React.FunctionComponent<Props> = ({
  fetchProjectsRequest,
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

  useFetchProjectIfUndefined(fetchProjectsRequest, match.params.projectId, project);

  const [allUsers, setAllUsers] = React.useState([]);

  const fetchAllUsers = () => {
    const request = makeGetRequest('/api/core/user/all', true);
    request
      .then((response) => {
        if(response) { 
          setAllUsers(response.body.map((apiUser:ApiUser) => modelizeUser(apiUser)));
        }
      })
  }

  React.useEffect(
    () => {
      fetchAllUsers();
    },
    [],
  );

  const projectMembersSelectOptions = allUsers && allUsers.map((member: User) => ({
    value: member.id,
    label: member.username,
  }));

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
      />
      <Style.ProjectMembersBlock>
        {mergeAdminsAndMembers(project.admins, project.members).map((user: DisplayedUser) => 
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
