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

class Front extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.fetchProjectRequest(this.props.match.params.projectId);
  }

  render() {
    const { project } = this.props;
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
  }
}

export default Front;
