import { updateDisplayedMetrics } from '../actions';
import reducer, { ParametersState } from '../reducer';

const initialState: ParametersState = {
  displayedMetrics: [
    'WPTMetricFirstViewTTI',
    'WPTMetricFirstViewSpeedIndex',
    'WPTMetricFirstViewLoadTime',
  ],
};

describe('Parameters reducer', () => {
  describe('UPDATE_DISPLAYED_METRICS case', () => {
    it('Should return an empty list when no metric is set to be displayed', () => {
      const action = updateDisplayedMetrics({ displayedMetrics: [] });
      const expectedState = { displayedMetrics: [] };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('Should return the given list if the list is not empty', () => {
      const newState: ParametersState = {
        displayedMetrics: [
          'WPTMetricFirstViewSpeedIndex',
          'WPTMetricRepeatViewSpeedIndex',
          'WPTMetricFirstViewFirstPaint',
          'WPTMetricRepeatViewFirstPaint',
        ],
      };
      const action = updateDisplayedMetrics(newState);
      const expectedState = newState;

      expect(reducer(newState, action)).toEqual(expectedState);
    });
  });
});
