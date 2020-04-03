import dayjs from 'dayjs';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchAuditResultsRequest } from 'redux/auditResults';
import { selectAuditResultsAsGraphData } from 'redux/auditResults/selectors';
import { getCurrentAuditParametersId, getCurrentPageId, getCurrentScriptId } from 'redux/parameters/selectors';
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
    ? selectAuditResultsAsGraphData(state, props.auditResultIds, props.metrics)
    : null,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAuditResultsRequest: (
    auditParametersId: string,
    pageOrScriptId: string,
    type: 'page' | 'script',
    fromDate?: dayjs.Dayjs,
    toDate?: dayjs.Dayjs
  ) => dispatch(fetchAuditResultsRequest({ auditParametersId, pageOrScriptId, type, fromDate, toDate }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(GraphsBlock));
