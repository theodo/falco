import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PageMetric, { Props } from './PageMetric';
import { RootState } from 'redux/types';
import { fetchAuditResultsRequest } from 'redux/auditResults';

const mapStateToProps = (state: RootState, props: Props) => ({
  page: state.pages.byId[props.pageId],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAuditResultsRequest: (pageId: string) => dispatch(fetchAuditResultsRequest({ pageId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageMetric);
