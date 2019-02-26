import * as React from 'react';
import { RouteComponentProps } from 'react-router';

type Props = {
  fetchProjectRequest: (projectId: string) => void;
};

type Params = {
  projectId: string;
};

class Front extends React.Component<Props & RouteComponentProps<Params>> {
  componentDidMount() {
    this.props.fetchProjectRequest(this.props.match.params.projectId);
  }

  render() {
    return <React.Fragment>LOLOLOL</React.Fragment>;
  }
}

export default Front;
