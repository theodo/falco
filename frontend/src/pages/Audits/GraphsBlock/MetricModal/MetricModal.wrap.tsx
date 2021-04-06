import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { MetricType } from 'redux/auditResults/types';
import { updateDisplayedMetrics } from 'redux/parameters';
import { getCurrentProjectId } from 'redux/selectors';
import { RootStateWithRouter } from 'redux/types';
import MetricModal from './MetricModal';

const mapStateToProps = (state: RootStateWithRouter) => ({
  projectId: getCurrentProjectId(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateDisplayedMetrics: (projectId: string, displayedMetrics: MetricType[]) =>
    dispatch(updateDisplayedMetrics({ projectId, displayedMetrics })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MetricModal);
