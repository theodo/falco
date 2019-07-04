import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
  getCurrentAuditParametersId,
  getCurrentPageId,
  getCurrentProjectAuditParameters,
  getCurrentScriptId,
  getCurrentScriptStepId,
} from 'redux/parameters/selectors';
import { RootStateWithRouter } from 'redux/types';

import { getCurrentProject, getCurrentURL } from 'redux/selectors';
import { Menu } from './Menu';

const mapStateToProps = (state: RootStateWithRouter) => ({
  auditParametersId: getCurrentAuditParametersId(state),
  currentURL: getCurrentURL(state),
  currentPageId: getCurrentPageId(state),
  project: getCurrentProject(state),
  auditParametersList: getCurrentProjectAuditParameters(state),
  currentScriptId: getCurrentScriptId(state),
  scriptStepId: getCurrentScriptStepId(state),
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Menu));
