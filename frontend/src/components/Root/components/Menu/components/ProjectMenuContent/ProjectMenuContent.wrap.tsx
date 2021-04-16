import { connect } from 'react-redux';
import {
  getCurrentAuditParametersId,
  getCurrentPageId,
  getCurrentProjectAuditParameters,
  getCurrentProjectRunningAudits,
  getCurrentScriptId,
  getCurrentScriptStepId,
} from 'redux/parameters/selectors';
import { RootStateWithRouter } from 'redux/types';

import { Dispatch } from 'redux';
import { launchAuditAction } from 'redux/entities/audits';
import { ProjectMenuContent } from './ProjectMenuContent';

const mapStateToProps = (state: RootStateWithRouter) => ({
  auditParametersId: getCurrentAuditParametersId(state),
  currentPageId: getCurrentPageId(state),
  auditParametersList: getCurrentProjectAuditParameters(state),
  currentScriptId: getCurrentScriptId(state),
  scriptStepId: getCurrentScriptStepId(state),
  runningAudits: getCurrentProjectRunningAudits(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  launchAudits: (projectId: string) => dispatch(launchAuditAction.request({ projectId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMenuContent);
