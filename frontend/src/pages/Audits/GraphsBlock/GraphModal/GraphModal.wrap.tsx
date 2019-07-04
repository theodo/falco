import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import GraphModal from './GraphModal';

import { getCurrentAuditParametersName, getCurrentPageName, getCurrentProjectName, getCurrentScriptName } from 'redux/parameters/selectors';

import { RootStateWithRouter } from 'redux/types';

const mapStateToProps = (state: RootStateWithRouter) => ({
  currentAuditParametersName: getCurrentAuditParametersName(state),
  projectName: getCurrentProjectName(state),
  pageName: getCurrentPageName(state),
  scriptName: getCurrentScriptName(state),
});
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(GraphModal));
