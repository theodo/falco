import { connect } from 'react-redux';

import {
  getCurrentAuditParametersName,
  getCurrentPageName,
  getCurrentProjectName,
  getCurrentScriptName,
} from 'redux/parameters/selectors';

import { isAuditResultLoading } from 'redux/auditResults/selectors';
import { RootStateWithRouter } from 'redux/types';
import GraphModal from './GraphModal';

const mapStateToProps = (state: RootStateWithRouter) => ({
  currentAuditParametersName: getCurrentAuditParametersName(state),
  projectName: getCurrentProjectName(state),
  pageName: getCurrentPageName(state),
  scriptName: getCurrentScriptName(state),
  isLoading: isAuditResultLoading(state),
});

export default connect(mapStateToProps)(GraphModal);
