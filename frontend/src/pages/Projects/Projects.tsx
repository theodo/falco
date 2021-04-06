import * as React from 'react';
import { Redirect } from 'react-router';
import { routeDefinitions } from 'routes';

import Loader from 'components/Loader';
import Welcome from 'components/Welcome';
import { useAllProjects } from 'redux/entities/projects/hooks';
import { Container } from './Projects.style';

const Projects: React.FunctionComponent = () => {
  const projects = useAllProjects();

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
