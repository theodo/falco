import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';

import { editAuditParameterRequest } from 'redux/entities/auditParameters';
import { fetchProjectsRequest, setProjectToastrDisplay } from 'redux/entities/projects';
import { getProject, getProjectToastrDisplay } from 'redux/entities/projects/selectors';
import { ProjectToastrDisplayType } from 'redux/entities/projects/types';
import { getUser } from 'redux/user/selectors';
import EnvironmentSettings, { OwnProps } from './EnvironmentSettings';

import { addAuditParameterToProjectRequest, deleteAuditParameterFromProjectRequest } from 'redux/entities/projects';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  currentUser: getUser(state),
  project: getProject(state, props.match.params.projectId),
  toastrDisplay: getProjectToastrDisplay(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectsRequest: (projectId: string) => dispatch(fetchProjectsRequest({ currentProjectId: projectId })),
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) => dispatch(setProjectToastrDisplay({ toastrDisplay })),
  addAuditParameterToProjectRequest: (projectId: string, auditParameterName: string, auditParameterNetworkShape: string, auditParameterConfigurationId: string) =>
    dispatch(addAuditParameterToProjectRequest({ projectId, auditParameterName, auditParameterNetworkShape, auditParameterConfigurationId })),
  editAuditParameterRequest: (projectId: string, auditParameter: { name: string, uuid: string, configuration_id: string, network_shape: string }) =>
    dispatch(editAuditParameterRequest({ projectId, auditParameter })),
  deleteAuditParameterFromProjectRequest: (projectId: string, auditParameterId: string) =>
    dispatch(deleteAuditParameterFromProjectRequest({ projectId, auditParameterId }))

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(EnvironmentSettings));
