import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ProjectType } from 'redux/projects/types';
import PageMetric from 'components/PageMetric';

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
      <React.Fragment>
        <div>{project.name}</div>
        <div>
          {project.pages.map(pageId => (
            <PageMetric key={pageId} pageId={pageId} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Front;
