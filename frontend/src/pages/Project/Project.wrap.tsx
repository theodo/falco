import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { fetchProjectRequest } from 'redux/projects';
import { RootState } from 'redux/types';

import Project, { OwnProps } from './Project';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  project: state.projects.byId[props.match.params.projectId],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectRequest: (projectId: string) => dispatch(fetchProjectRequest({ projectId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Project));
