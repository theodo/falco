import { connect } from 'react-redux';
import { getAllProjects } from 'redux/entities/projects/selectors';
import { getCurrentProject } from 'redux/selectors';
import { RootStateWithRouter } from 'redux/types';
import ProjectsMenu from './ProjectsMenu';

const mapStateToProps = (state: RootStateWithRouter) => ({
  currentProject: getCurrentProject(state),
  projects: getAllProjects(state),
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectsMenu);
