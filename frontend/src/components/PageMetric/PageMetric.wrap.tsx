import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PageMetric, { OwnProps } from './PageMetric';
import { RootState } from 'redux/types';
import { fetchAuditResultsRequest } from 'redux/auditResults';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  page: state.pages.byId[props.pageId],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageMetric);
