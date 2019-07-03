import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import GraphModal from './GraphModal';

import { getCurrentAuditParameters, getCurrentPageName, getCurrentScriptName } from 'redux/parameters/selectors';

import { getCurrentProject } from 'redux/selectors';
import { RootStateWithRouter } from 'redux/types';

const mapStateToProps = (state: RootStateWithRouter) => ({
  currentAuditParameters: getCurrentAuditParameters(state),
  project: getCurrentProject(state),
  pageName: getCurrentPageName(state),
  scriptName: getCurrentScriptName(state),
});
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(GraphModal));
