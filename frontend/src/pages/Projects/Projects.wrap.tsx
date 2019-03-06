import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchProjectsRequest } from 'redux/projects';
import { RootState } from 'redux/types';
import Projects from './Projects';

const mapStateToProps = (state: RootState) => ({
  projects: Object.keys(state.projects.byId).map(projectId => state.projects.byId[projectId]),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectsRequest: () => dispatch(fetchProjectsRequest({})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects);
