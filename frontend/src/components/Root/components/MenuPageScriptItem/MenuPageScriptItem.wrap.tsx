import { connect } from 'react-redux';
import { getCurrentAuditParametersId } from 'redux/parameters/selectors';
import { getCurrentProjectId, getCurrentURL } from 'redux/selectors';
import { RootStateWithRouter } from 'redux/types';
import { MenuPageScriptItem } from './MenuPageScriptItem';

import { getPage, getPageLatestAuditStatusHistory } from 'redux/entities/pages/selectors';
import { getScript, getScriptLatestAuditStatusHistory } from 'redux/entities/scripts/selectors';
import { OwnProps } from './MenuPageScriptItem';

const mapStateToProps = (state: RootStateWithRouter, props: OwnProps) => ({
  projectId: getCurrentProjectId(state),
  page: getPage(state, props.pageId || ''),
  script: getScript(state, props.scriptId || ''),
  pageLatestAuditStatusHistory: getPageLatestAuditStatusHistory(state, props.pageId || ''),
  scriptLatestAuditStatusHistory: getScriptLatestAuditStatusHistory(state, props.scriptId || ''),
  auditParametersId: getCurrentAuditParametersId(state),
  currentURL: getCurrentURL(state),
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuPageScriptItem);
