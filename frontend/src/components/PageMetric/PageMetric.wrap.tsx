import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchAuditResultsRequest } from 'redux/auditResults';
import { RootState } from 'redux/types';
import PageMetric, { OwnProps } from './PageMetric';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  page: state.pages.byId[props.pageId],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageMetric);
