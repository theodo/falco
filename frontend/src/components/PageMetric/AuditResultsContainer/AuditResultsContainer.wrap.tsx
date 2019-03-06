import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchAuditResultsRequest } from 'redux/auditResults';
import { RootState } from 'redux/types';
import AuditResultsContainer, { OwnProps } from './AuditResultsContainer';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  sortedAuditResultsIds: state.auditResults.sortedByPageId[props.pageId],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAuditResultsRequest: (pageId: string) => dispatch(fetchAuditResultsRequest({ pageId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuditResultsContainer);
