import dayjs from 'dayjs';
import { Star } from 'icons';
import React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { ProjectType } from 'redux/projects/types';
import { routeDefinitions } from 'routes';
import { colorUsage, getSpacing } from 'stylesheet';

import ErrorMessage from 'components/ErrorMessage';
import Loader from 'components/Loader';
import Style from './ProjectsMenu.style';

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
    [isUserAuthenticated],
  );

  const renderCurrentProjectItem = () =>
    currentProject && (
      <Style.CurrentProjectItem>
        <Style.ProjectItemSnapshotContainer>
          <Style.CurrentProjectItemSnapshot
            src={currentProject.screenshotUrl}
            margin={`0 ${getSpacing(6)} 0 0`}
          />
        </Style.ProjectItemSnapshotContainer>
        <Style.CurrentProjectItemTitleBlock>
          <Style.CurrentProjectItemTitleContainer margin={`0 0 ${getSpacing(1)} 0`}>
            <Style.CurrentProjectItemStarContainer margin={`0 ${getSpacing(2)} 0 0`}>
              <Star color={colorUsage.projectsMenuItemStar} />
            </Style.CurrentProjectItemStarContainer>
            <Style.CurrentProjectItemTitle>{currentProject.name}</Style.CurrentProjectItemTitle>
          </Style.CurrentProjectItemTitleContainer>
          <Style.ProjectItemLastAudit>
            {intl.formatMessage({ id: `Header.last_audit_intro` })}{' '}
            {dayjs(currentProject.latestAuditAt)
              .locale(intl.locale)
              .fromNow()}
          </Style.ProjectItemLastAudit>
        </Style.CurrentProjectItemTitleBlock>
      </Style.CurrentProjectItem>
    );

  const renderProjectItem = (project: ProjectType | null) =>
    project && (
      <Style.ProjectItem
        key={project.uuid}
        to={routeDefinitions.projectDetails.path.replace(':projectId', project.uuid)}
      >
        <Style.ProjectItemSnapshotContainer>
          <Style.ProjectItemSnapshot
            src={project.screenshotUrl}
            margin={`0 ${getSpacing(4)} 0 0`}
          />
        </Style.ProjectItemSnapshotContainer>
        <Style.ProjectItemTitleBlock>
          <Style.ProjectItemTitle>{project.name}</Style.ProjectItemTitle>
          <Style.ProjectItemLastAudit>
            {intl.formatMessage({ id: `Header.last_audit_intro` })}{' '}
            {dayjs(project.latestAuditAt)
              .locale(intl.locale)
              .fromNow()}
          </Style.ProjectItemLastAudit>
        </Style.ProjectItemTitleBlock>
      </Style.ProjectItem>
    );

  if (isVisible) {
    if (null === projects) {
      return (
        <Style.Container position={position} right={right}>
          <Loader minHeight={'200px'} />
        </Style.Container>
      );
    }

    if (0 === projects.length) {
      return (
        <Style.Container position={position} right={right}>
          <ErrorMessage>
            <FormattedMessage id="Projects.no_project_error" />
          </ErrorMessage>
        </Style.Container>
      );
    }
    return (
      <Style.Container position={position} right={right}>
        {renderCurrentProjectItem()}
        <Style.ProjectItemContainer>
          {projects
            .filter((project: ProjectType | null) => currentProject !== project)
            .map((project: ProjectType | null) => renderProjectItem(project))}
        </Style.ProjectItemContainer>
      </Style.Container>
    );
  }
  return <div />;
};
