import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchAuditResultsRequest } from 'redux/auditResults';
import { RootState } from 'redux/types';
import AuditResultsContainer, { OwnProps } from './AuditResultsContainer';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  sortedAuditResultsIds: state.auditResults.sortedByScriptId[props.scriptId],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAuditResultsRequest: (scriptId: string) => dispatch(fetchAuditResultsRequest({ id: scriptId, type: "script" })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuditResultsContainer);
