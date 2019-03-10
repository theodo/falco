import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { ProjectType } from 'redux/projects/types';

import Style from './Projects.style';
import ProjectTile from './ProjectTile';

interface Props {
  fetchProjectsRequest: () => void;
  projects: ProjectType[];
}

const Projects: React.FunctionComponent<Props> = props => {
  const { fetchProjectsRequest, projects } = props;
  React.useEffect(() => {
    fetchProjectsRequest();
  }, []);

  if (!projects || projects.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <Style.Container>
      <Style.ProjectTitle>
        <Typography variant="h4">
          <FormattedMessage id="Projects.title" />
        </Typography>
      </Style.ProjectTitle>
      {projects.map(project => (
        <ProjectTile project={project} />
      ))}
    </Style.Container>
  );
};

export default Projects;
