import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Front, { OwnProps } from './Front';
import { fetchProjectRequest } from 'redux/projects';
import { RootState } from 'redux/types';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  project: state.projects.byId[props.match.params.projectId],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectRequest: (projectId: string) => dispatch(fetchProjectRequest({ projectId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Front);
