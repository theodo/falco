import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { Redirect } from 'react-router';
import { ProjectType } from 'redux/entities/projects/types';
import { routeDefinitions } from 'routes';

import Loader from 'components/Loader';
import Welcome from 'components/Welcome';
import { useFetchProjectIfUndefined } from 'redux/entities/projects/useFetchProjectIfUndefined';
import { Container } from './Projects.style';

type Props = {
  fetchProjectsRequest: () => void;
  projects: Array<ProjectType | null> | null;
} & InjectedIntlProps;

const Projects: React.FunctionComponent<Props> = ({ fetchProjectsRequest, projects }) => {
  useFetchProjectIfUndefined(fetchProjectsRequest, "", undefined);

  if (null === projects) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (0 === projects.length) {
    return (
      <Container>
        <Welcome />
      </Container>
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
