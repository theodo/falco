import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PageMetric, { Props } from './PageMetric';
import { RootState } from 'redux/types';

const mapStateToProps = (state: RootState, props: Props) => ({
  page: state.pages.byId[props.pageId],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageMetric);
