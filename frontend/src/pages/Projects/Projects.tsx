import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { Redirect } from 'react-router';
import { ProjectType } from 'redux/entities/projects/types';
import { routeDefinitions } from 'routes';

import ErrorMessage from 'components/ErrorMessage';
import Loader from 'components/Loader';
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
        <ErrorMessage>
          <FormattedMessage id="Projects.no_project_error" />
        </ErrorMessage>
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
