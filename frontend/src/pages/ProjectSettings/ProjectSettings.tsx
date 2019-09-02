import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { ValueType } from 'react-select/lib/types';
import { ProjectMember, ProjectType } from 'redux/entities/projects/types';

import Badge from 'components/Badge';
import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import { useFetchProjectIfUndefined } from 'redux/entities/projects/useFetchProjectIfUndefined';
import { UserState } from 'redux/user';
import { modelizeUser } from 'redux/user/modelizer';
import { ApiUser, User } from 'redux/user/types';
import { makeGetRequest } from 'services/networking/request';
import { isUserAdminOfProject } from 'services/utils';
import { colorUsage } from 'stylesheet';
import Style from './ProjectSettings.style';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
}>;

type Props = {
  currentUser: UserState,
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
  currentUser
}) => {

  interface UserOption {
    value: string;
    label: string;
    disabled: boolean;
  };

  useFetchProjectIfUndefined(fetchProjectsRequest, match.params.projectId, project);

  const [selectOption, setSelectOption]: [ValueType<UserOption | {}>, any] = React.useState(null);
  const [allUsers, setAllUsers] = React.useState([]);

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
      {isUserAdminOfProject(currentUser, project) && <Style.SelectUser
        placeholder={intl.formatMessage({ id: "ProjectSettings.add_member" })}
        options={projectMembersSelectOptions}
        onChange={onChange}
        isOptionDisabled={(option: UserOption) => option.disabled}
        value={selectOption}
      />}
      <Style.ProjectMembersBlock>
        { // display admins first : see higher for an explanation of this sorting method
          project.projectMembers.sort((a, b) => +b.isAdmin - +a.isAdmin).map((projectMember: ProjectMember) =>
          <Style.ProjectMemberContainer key={projectMember.username}>
            <Style.MemberUsername>{projectMember.username}</Style.MemberUsername>
            <Style.MemberEmail>{projectMember.emailAddress}</Style.MemberEmail>
            <Style.MemberAdminBadgeContainer>
              {projectMember.isAdmin && <Badge
                backgroundColor={colorUsage.adminBadgeBackground}
                color={colorUsage.adminBadgeText}
                text={intl.formatMessage({id: "ProjectSettings.admin"}).toUpperCase()}
              />}
            </Style.MemberAdminBadgeContainer>
            <Style.MemberAdminDeleteContainer>
                {currentUser && projectMember.username !== currentUser.username && <Style.MemberAdminDeleteIcon
                  color={colorUsage.deleteMemberIconColor}
                  width="13px"
                  strokeWidth="20"
                />}
            </Style.MemberAdminDeleteContainer >
          </Style.ProjectMemberContainer>
        )}
      </Style.ProjectMembersBlock>
    </Style.Container>
  );
}

export default ProjectSettings;
