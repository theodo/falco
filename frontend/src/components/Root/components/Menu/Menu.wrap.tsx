import { injectIntl } from 'react-intl';
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
import { getUser } from 'redux/user/selectors';

import { Dispatch } from 'redux';
import { launchAuditAction } from 'redux/entities/audits';
import { getCurrentProject } from 'redux/selectors';
import { Menu } from './Menu';

const mapStateToProps = (state: RootStateWithRouter) => ({
  user: getUser(state),
  auditParametersId: getCurrentAuditParametersId(state),
  currentPageId: getCurrentPageId(state),
  project: getCurrentProject(state),
  auditParametersList: getCurrentProjectAuditParameters(state),
  currentScriptId: getCurrentScriptId(state),
  scriptStepId: getCurrentScriptStepId(state),
  runningAudits: getCurrentProjectRunningAudits(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  launchAudits: (projectId: string) => dispatch(launchAuditAction.request({ projectId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Menu));
