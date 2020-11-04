import { connect } from 'react-redux';

import GraphModal from './GraphModal';

import {
  getCurrentAuditParametersName,
  getCurrentPageName,
  getCurrentProjectName,
  getCurrentScriptName,
} from 'redux/parameters/selectors';

import { isAuditResultLoading } from 'redux/auditResults/selectors';
import { RootStateWithRouter } from 'redux/types';

const mapStateToProps = (state: RootStateWithRouter) => ({
  currentAuditParametersName: getCurrentAuditParametersName(state),
  projectName: getCurrentProjectName(state),
  pageName: getCurrentPageName(state),
  scriptName: getCurrentScriptName(state),
  isLoading: isAuditResultLoading(state),
});

export default connect(mapStateToProps)(GraphModal);
