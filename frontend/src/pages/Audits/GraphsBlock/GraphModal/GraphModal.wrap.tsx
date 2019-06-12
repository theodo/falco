import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import GraphModal from './GraphModal';

import { getCurrentAuditParametersId, getCurrentPage, getCurrentScript } from 'redux/parameters/selectors';

import { getCurrentProject } from 'redux/selectors';
import { RootStateWithRouter } from 'redux/types';

const mapStateToProps = (state: RootStateWithRouter) => ({
  auditParametersId: getCurrentAuditParametersId(state),
  project: getCurrentProject(state),
  page: getCurrentPage(state),
  script: getCurrentScript(state),
});
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(GraphModal));
