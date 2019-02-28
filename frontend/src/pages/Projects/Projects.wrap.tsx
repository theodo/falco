import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Projects from './Projects';
import { fetchProjectsRequest } from 'redux/projects';
import { RootState } from 'redux/types';

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
