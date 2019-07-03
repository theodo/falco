import dayjs from 'dayjs';
import React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { ProjectType } from 'redux/entities/projects/types';
import { routeDefinitions } from 'routes';
import { getSpacing } from 'stylesheet';

import ErrorMessage from 'components/ErrorMessage';
import Loader from 'components/Loader';
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
  currentProject: ProjectType | undefined;
  fetchProjectsRequest: () => void;
  isVisible: boolean;
  position?: string;
  projects: Array<ProjectType | null> | null;
  right?: string | null;
  isUserAuthenticated: boolean;
}

type Props = OwnProps & InjectedIntlProps;

export const ProjectsMenu: React.FunctionComponent<Props> = ({
  currentProject,
  fetchProjectsRequest,
  intl,
  isVisible,
  position,
  projects,
  right,
  isUserAuthenticated,
}) => {
  React.useEffect(
    () => {
      if (isUserAuthenticated) {
        fetchProjectsRequest();
      }
    },
    [isUserAuthenticated, fetchProjectsRequest],
  );

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
          <ErrorMessage>
            <FormattedMessage id="Projects.no_project_error" />
          </ErrorMessage>
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
        </ProjectItemContainer>
      </Container>
    );
  }
  return <div />;
};
