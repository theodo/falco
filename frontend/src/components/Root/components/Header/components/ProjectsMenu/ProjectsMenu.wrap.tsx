import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchProjectsRequest } from 'redux/entities/projects';
import { getIsAuthenticated } from 'redux/login';
import { getCurrentProject } from 'redux/selectors';
import { RootStateWithRouter } from 'redux/types';
import { ProjectsMenu } from './ProjectsMenu';

const mapStateToProps = (state: RootStateWithRouter) => ({
  currentProject: getCurrentProject(state),
  projects: state.entities.projects.byId
    ? Object.keys(state.entities.projects.byId).map(projectId =>
      state.entities.projects.byId ? state.entities.projects.byId[projectId] : null,
    )
    : null,
  isUserAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectsRequest: () => dispatch(fetchProjectsRequest({})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ProjectsMenu));
