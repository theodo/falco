import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchProjectsRequest } from 'redux/entities/projects';
import { getAllProjects } from 'redux/entities/projects/selectors';
import { RootState } from 'redux/types';
import Projects from './Projects';

const mapStateToProps = (state: RootState) => ({
  projects: getAllProjects(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectsRequest: () => dispatch(fetchProjectsRequest({})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects);
