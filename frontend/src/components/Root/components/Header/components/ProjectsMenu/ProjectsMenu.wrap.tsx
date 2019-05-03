import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getCurrentProject } from 'redux/selectors';
import { RootStateWithRouter } from 'redux/types';
import { ProjectsMenu } from './ProjectsMenu';

const mapStateToProps = (state: RootStateWithRouter) => ({
  currentProject: getCurrentProject(state),
  projects: state.projects.byId
    ? Object.keys(state.projects.byId).map(projectId =>
        state.projects.byId ? state.projects.byId[projectId] : null,
      )
    : null,
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ProjectsMenu));
