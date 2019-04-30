import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { fetchProjectRequest } from 'redux/projects';
import { RootState } from 'redux/types';

import Front, { OwnProps } from './Front';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  project: state.projects.byId ? state.projects.byId[props.match.params.projectId] : undefined,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectRequest: (projectId: string) => dispatch(fetchProjectRequest({ projectId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Front));
