import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ProjectType } from 'redux/projects/types';
import PageMetric from 'components/PageMetric';
import Style from './Front.style';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
}>;

type Props = {
  fetchProjectRequest: (projectId: string) => void;
  project?: ProjectType;
} & OwnProps;

const Front: React.FunctionComponent<Props> = props => {
  const { fetchProjectRequest, project, match } = props;
  React.useEffect(
    () => {
      fetchProjectRequest(match.params.projectId);
    },
    [match.params.projectId],
  );

  if (!project) return <div>Loading...</div>;
  return (
    <Style.Container>
      <Style.ProjectTitle>
        <Typography variant="h4">{project.name}</Typography>
      </Style.ProjectTitle>
      {project.pages.map(pageId => (
        <PageMetric key={pageId} pageId={pageId} />
      ))}
    </Style.Container>
  );
};

export default Front;
