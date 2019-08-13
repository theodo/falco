import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchAuditResultsRequest } from 'redux/auditResults';
import { selectAuditResultsAsGraphData } from 'redux/auditResults/selectors';
import { getCurrentAuditParametersId, getCurrentPageId, getCurrentScriptId, getMetricsToDisplay } from 'redux/parameters/selectors';
import { RootState } from 'redux/types';
import { GraphsBlock, OwnProps } from './GraphsBlock';

const getAuditType = (state: RootState): 'page' | 'script' => {
  return (getCurrentPageId(state) ? 'page' : 'script')
}

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  auditParametersId: getCurrentAuditParametersId(state) || '',
  auditType: getAuditType(state),
  pageOrScriptId: getCurrentPageId(state) || getCurrentScriptId(state) || '',
  auditResults: props.auditResultIds
    ? selectAuditResultsAsGraphData(state, props.auditResultIds, getMetricsToDisplay(state))
    : null,
  metrics: getMetricsToDisplay(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAuditResultsRequest: (
    auditParametersId: string,
    pageOrScriptId: string,
    type: 'page' | 'script',
    fromDate?: Date,
    toDate?: Date
  ) => dispatch(fetchAuditResultsRequest({ auditParametersId, pageOrScriptId, type, fromDate, toDate }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(GraphsBlock));
