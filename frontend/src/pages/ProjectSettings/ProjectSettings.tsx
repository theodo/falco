import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { ProjectType } from 'redux/entities/projects/types';

import Badge from 'components/Badge';
import MessagePill from 'components/MessagePill';
import { useFetchProjectIfUndefined } from 'redux/entities/projects/useFetchProjectIfUndefined';
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
  project,
}) => {

  useFetchProjectIfUndefined(fetchProjectsRequest, match.params.projectId, project);

  if (!project) {
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
      <Style.ProjectMembersBlock>
        <Style.ProjectMemberContainer>
          <Style.MemberUsername>guillaumec</Style.MemberUsername>
          <Style.MemberEmail>guillaumec@theodo.fr</Style.MemberEmail>
          <Style.MemberAdminBadgeContainer>
            <Badge
              backgroundColor={colorUsage.adminBadgeBackground}
              color={colorUsage.adminBadgeText}
              text="ADMIN"
            />
          </Style.MemberAdminBadgeContainer>
          <Style.MemberAdminCloseContainer />
        </Style.ProjectMemberContainer>
      </Style.ProjectMembersBlock>
    </Style.Container>
  );
}

export default ProjectSettings;
