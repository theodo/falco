import dayjs from 'dayjs';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ProjectType } from 'redux/entities/projects/types';
import { routeDefinitions } from 'routes';
import { getSpacing } from 'stylesheet';

import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import {
  Container,
  CurrentProjectItem,
  CurrentProjectItemSnapshot,
  CurrentProjectItemTitle,
  CurrentProjectItemTitleBlock,
  CurrentProjectItemTitleContainer,
  ProjectItem,
  ProjectItemContainer,
  ProjectItemLastAudit,
  ProjectItemSnapshot,
  ProjectItemSnapshotContainer,
  ProjectItemTitle,
  ProjectItemTitleBlock,
} from './ProjectsMenu.style';

interface OwnProps {
  currentProject?: ProjectType | null;
  projects: Array<ProjectType | null> | null;
}

type Props = OwnProps;

export const ProjectsMenu: React.FunctionComponent<Props> = ({ currentProject, projects }) => {
  const intl = useIntl();

  const renderCurrentProjectItem = () =>
    currentProject && (
      <CurrentProjectItem>
        <ProjectItemSnapshotContainer>
          <CurrentProjectItemSnapshot
            src={currentProject.screenshotUrl}
            margin={`0 ${getSpacing(6)} 0 0`}
            alt=""
          />
        </ProjectItemSnapshotContainer>
        <CurrentProjectItemTitleBlock>
          <CurrentProjectItemTitleContainer margin={`0 0 ${getSpacing(1)} 0`}>
            <CurrentProjectItemTitle>{currentProject.name}</CurrentProjectItemTitle>
          </CurrentProjectItemTitleContainer>
          <ProjectItemLastAudit>
            <FormattedMessage id="Header.last_audit_intro" />{' '}
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
            alt=""
          />
        </ProjectItemSnapshotContainer>
        <ProjectItemTitleBlock>
          <ProjectItemTitle>{project.name}</ProjectItemTitle>
          <ProjectItemLastAudit>
            <FormattedMessage id="Header.last_audit_intro" />{' '}
            {dayjs(project.latestAuditAt)
              .locale(intl.locale)
              .fromNow()}
          </ProjectItemLastAudit>
        </ProjectItemTitleBlock>
      </ProjectItem>
    );

  if (null === projects) {
    return (
      <Container>
        <Loader minHeight={'200px'} />
      </Container>
    );
  }

  if (0 === projects.length) {
    return (
      <Container>
        <MessagePill messageType="error">
          <FormattedMessage id="Projects.no_project_error" />
        </MessagePill>
      </Container>
    );
  }
  return (
    <Container>
      {renderCurrentProjectItem()}
      <ProjectItemContainer>
        {projects
          .filter((project: ProjectType | null) => currentProject !== project)
          .map((project: ProjectType | null) => renderProjectItem(project))}
      </ProjectItemContainer>
    </Container>
  );
};
