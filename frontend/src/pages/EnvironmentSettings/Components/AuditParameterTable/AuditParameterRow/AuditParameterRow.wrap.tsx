import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { editAuditParameterRequest } from 'redux/entities/auditParameters';
import { getAuditParameters } from 'redux/entities/auditParameters/selectors';
import { deleteAuditParameterFromProjectRequest } from 'redux/entities/projects';
import { RootState } from 'redux/types';
import { AuditParameterRow, OwnProps } from './AuditParameterRow';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  auditParameter: getAuditParameters(state, props.auditParameterId || ''),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editAuditParameterRequest: (
    projectId: string,
    auditParameter: { name: string; uuid: string; configuration_id: string; network_shape: string },
  ) => dispatch(editAuditParameterRequest({ projectId, auditParameter })),
  deleteAuditParameterFromProjectRequest: (projectId: string, auditParameterId: string) =>
    dispatch(deleteAuditParameterFromProjectRequest({ projectId, auditParameterId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuditParameterRow);
