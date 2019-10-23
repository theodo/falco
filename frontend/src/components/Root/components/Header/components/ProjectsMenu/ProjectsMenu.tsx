import dayjs from 'dayjs';
import React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { ProjectType } from 'redux/entities/projects/types';
import { routeDefinitions } from 'routes';
import { colorUsage, getSpacing } from 'stylesheet';

import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import { Add } from 'icons';
import {
  Container,
  CurrentProjectItem,
  CurrentProjectItemSnapshot,
  CurrentProjectItemTitle,
  CurrentProjectItemTitleBlock,
  CurrentProjectItemTitleContainer,
  NewProject,
  NewProjectItem,
  ProjectItem,
  ProjectItemContainer,
  ProjectItemLastAudit,
  ProjectItemSnapshot,
  ProjectItemSnapshotContainer,
  ProjectItemTitle,
  ProjectItemTitleBlock
} from './ProjectsMenu.style';

interface OwnProps {
  currentProject?: ProjectType | null;
  isVisible: boolean;
  position?: string;
  projects: Array<ProjectType | null> | null;
  right?: string | null;
}

type Props = OwnProps & InjectedIntlProps;

export const ProjectsMenu: React.FunctionComponent<Props> = ({
  currentProject,
  intl,
  isVisible,
  position,
  projects,
  right,
}) => {
  const renderCurrentProjectItem = () =>
    currentProject && (
      <CurrentProjectItem>
        <ProjectItemSnapshotContainer>
          <CurrentProjectItemSnapshot
            src={currentProject.screenshotUrl}
            margin={`0 ${getSpacing(6)} 0 0`}
          />
        </ProjectItemSnapshotContainer>
        <CurrentProjectItemTitleBlock>
          <CurrentProjectItemTitleContainer margin={`0 0 ${getSpacing(1)} 0`}>
            <CurrentProjectItemTitle>{currentProject.name}</CurrentProjectItemTitle>
          </CurrentProjectItemTitleContainer>
          <ProjectItemLastAudit>
            {intl.formatMessage({ id: `Header.last_audit_intro` })}{' '}
            {dayjs(currentProject.latestAuditAt)
              .locale(intl.locale)
              .fromNow()}
          </ProjectItemLastAudit>
        </CurrentProjectItemTitleBlock>
      </CurrentProjectItem>
    );

  const renderProjectItem = (project: ProjectType | null) =>
    project && (
      <ProjectItem
        key={project.uuid}
        to={routeDefinitions.projectDetails.path.replace(':projectId', project.uuid)}
      >
        <ProjectItemSnapshotContainer>
          <ProjectItemSnapshot
            src={project.screenshotUrl}
            margin={`0 ${getSpacing(4)} 0 0`}
          />
        </ProjectItemSnapshotContainer>
        <ProjectItemTitleBlock>
          <ProjectItemTitle>{project.name}</ProjectItemTitle>
          <ProjectItemLastAudit>
            {intl.formatMessage({ id: `Header.last_audit_intro` })}{' '}
            {dayjs(project.latestAuditAt)
              .locale(intl.locale)
              .fromNow()}
          </ProjectItemLastAudit>
        </ProjectItemTitleBlock>
      </ProjectItem>
    );

  if (isVisible) {
    if (null === projects) {
      return (
        <Container position={position} right={right}>
          <Loader minHeight={'200px'} />
        </Container>
      );
    }

    if (0 === projects.length) {
      return (
        <Container position={position} right={right}>
          <MessagePill messageType="error">
            <FormattedMessage id="Projects.no_project_error" />
          </MessagePill>
        </Container>
      );
    }
    return (
      <Container position={position} right={right}>
        {renderCurrentProjectItem()}
        <ProjectItemContainer>
          {projects
            .filter((project: ProjectType | null) => currentProject !== project)
            .map((project: ProjectType | null) => renderProjectItem(project))}
          <NewProjectItem to="new-project" >
            <Add color={colorUsage.scriptRowIcon} width="24px" strokeWidth="20" />
            <NewProject>
              <FormattedMessage id="Projects.create_new_project" />
            </NewProject>
          </NewProjectItem>
        </ProjectItemContainer>
      </Container>
    );
  }
  return <div />;
};
