import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { MetricType } from 'redux/auditResults/types';
import { updateDisplayedMetricsRequest } from 'redux/entities/projects';
import { getCurrentProjectId } from 'redux/selectors';
import { RootStateWithRouter } from 'redux/types';
import MetricModal from './MetricModal';

const mapStateToProps = (state: RootStateWithRouter) => ({
  projectId: getCurrentProjectId(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateDisplayedMetricsRequest: (projectId: string, displayedMetrics: MetricType[]) =>
    dispatch(updateDisplayedMetricsRequest({projectId, displayedMetrics}))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MetricModal);
