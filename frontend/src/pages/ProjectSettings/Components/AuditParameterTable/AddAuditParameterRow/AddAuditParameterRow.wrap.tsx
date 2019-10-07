import { connect } from 'react-redux';

import { injectIntl } from 'react-intl';
import { Dispatch } from 'redux';
import { addAuditParameterToProjectRequest } from 'redux/entities/projects';
import { AddAuditParameterRow } from './AddAuditParameterRow';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addAuditParameterToProjectRequest: (projectId: string, auditParameterName: string, auditParameterNetworkShape: string, auditParameterConfigurationId: string) =>
    dispatch(addAuditParameterToProjectRequest({ projectId, auditParameterName, auditParameterNetworkShape, auditParameterConfigurationId}))
});

export default connect(
  null,
  mapDispatchToProps,
)(injectIntl(AddAuditParameterRow));
