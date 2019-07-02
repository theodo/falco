import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchProjectsRequest } from 'redux/entities/projects';
import { RootState } from 'redux/types';
import Projects from './Projects';

const mapStateToProps = (state: RootState) => ({
  projects: state.projects.byId
    ? Object.keys(state.projects.byId).map(projectId =>
      state.projects.byId ? state.projects.byId[projectId] : null,
    )
    : null,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectsRequest: () => dispatch(fetchProjectsRequest({})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Projects));
