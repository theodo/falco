import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { Redirect } from 'react-router';
import { ProjectType } from 'redux/entities/projects/types';
import { routeDefinitions } from 'routes';

import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import Welcome from 'components/Welcome';
import { useFetchProjectIfUndefined } from 'redux/entities/projects/useFetchProjectIfUndefined';
import Style from './Projects.style';

type Props = {
  fetchProjectsRequest: () => void;
  projects: Array<ProjectType | null> | null;
} & InjectedIntlProps;

const Projects: React.FunctionComponent<Props> = ({ fetchProjectsRequest, projects }) => {
  useFetchProjectIfUndefined(fetchProjectsRequest, "", undefined);

  if (null === projects) {
    return (
      <Style.Container>
        <Loader />
      </Style.Container>
    );
  }

  if (0 === projects.length) {
    return (
      <Style.Container>
        <Welcome />
      </Style.Container>
    );
  }
  const firstProject = projects[0];
  const firstProjectLocation = routeDefinitions.projectDetails.path.replace(
    ':projectId',
    firstProject ? firstProject.uuid : '',
  );
  return <Redirect to={firstProjectLocation} />;
};

export default Projects;
