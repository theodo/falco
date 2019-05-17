import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { MetricType } from 'redux/auditResults/types';
import { updateDisplayedMetrics } from 'redux/parameters';
import MetricModal from './MetricModal';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateDisplayedMetrics: (displayedMetrics: MetricType[]) =>
    dispatch(updateDisplayedMetrics({ displayedMetrics })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MetricModal);
