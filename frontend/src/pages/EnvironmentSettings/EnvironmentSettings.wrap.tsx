import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';

import { editProjectDetailsRequest, fetchProjectsRequest, setProjectToastrDisplay } from 'redux/entities/projects';
import { getProject, getProjectToastrDisplay } from 'redux/entities/projects/selectors';
import { ProjectToastrDisplayType } from 'redux/entities/projects/types';
import { getUser } from 'redux/user/selectors';
import EnvironmentSettings, { OwnProps } from './EnvironmentSettings';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  currentUser: getUser(state),
  project: getProject(state, props.match.params.projectId),
  toastrDisplay: getProjectToastrDisplay(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectsRequest: (projectId: string) => dispatch(fetchProjectsRequest({ currentProjectId: projectId })),
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) => dispatch(setProjectToastrDisplay({ toastrDisplay })),
  editProjectDetailsRequest: (projectId: string, payload: {name: string, wpt_api_key: string}) => dispatch(editProjectDetailsRequest({ projectId, payload })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(EnvironmentSettings));
