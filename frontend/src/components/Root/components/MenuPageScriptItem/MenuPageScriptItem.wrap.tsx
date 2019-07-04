import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getCurrentAuditParametersId } from 'redux/parameters/selectors';
import { getCurrentProjectId, getCurrentURL } from 'redux/selectors';
import { RootStateWithRouter } from 'redux/types';
import { MenuPageScriptItem } from './MenuPageScriptItem';


const mapStateToProps = (state: RootStateWithRouter) => ({
  projectId: getCurrentProjectId(state),
  auditParametersId: getCurrentAuditParametersId(state),
  currentURL: getCurrentURL(state),
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(MenuPageScriptItem));
