import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { Redirect } from 'react-router';
import { ProjectType } from 'redux/projects/types';
import { routeDefinitions } from 'routes';
import { colorUsage } from 'stylesheet';

import Style from './Projects.style';

type Props = {
  fetchProjectsRequest: () => void;
  projects: Array<ProjectType | null> | null;
} & InjectedIntlProps;

const Projects: React.FunctionComponent<Props> = props => {
  const { fetchProjectsRequest, projects } = props;
  React.useEffect(() => {
    fetchProjectsRequest();
  }, []);

  if (null === projects) {
    return (
      <Style.Container>
        <Style.LoaderContainer color={colorUsage.loader}>
          <CircularProgress color={'inherit'} />
        </Style.LoaderContainer>
      </Style.Container>
    );
  }

  if (0 === projects.length) {
    return (
      <Style.Container>
        <Style.Error>
          <FormattedMessage id="Projects.no_project_error" />
        </Style.Error>
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
