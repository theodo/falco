import { MetricType } from 'redux/auditResults/types';
import { updateDisplayedMetrics } from '../actions';
import reducer, { ParametersState } from '../reducer';

const initialState: ParametersState = {
  metrics: {},
};

describe('Parameters reducer', () => {
  describe('UPDATE_DISPLAYED_METRICS case', () => {
    const projectId = '12345';

    it('Should return an empty list when no metric is set to be displayed', () => {
      const action = updateDisplayedMetrics({ displayedMetrics: [], projectId });
      const expectedState = { metrics: { [projectId]: [] } };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('Should return the given list if the list is not empty', () => {
      const displayedMetrics: MetricType[] = [
        'WPTMetricFirstViewSpeedIndex',
        'WPTMetricRepeatViewSpeedIndex',
        'WPTMetricFirstViewFirstPaint',
        'WPTMetricRepeatViewFirstPaint',
      ];
      const action = updateDisplayedMetrics({
        displayedMetrics,
        projectId,
      });

      const expectedState = { metrics: { [projectId]: displayedMetrics } };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
