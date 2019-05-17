import { updateDisplayedMetrics } from '../actions';
import reducer, { parametersState } from '../reducer';

const initialState: parametersState = {
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
      const action = updateDisplayedMetrics({
        displayedMetrics: [
          'WPTMetricFirstViewSpeedIndex',
          'WPTMetricRepeatViewSpeedIndex',
          'WPTMetricFirstViewFirstPaint',
          'WPTMetricRepeatViewFirstPaint',
        ],
      });
      const expectedState = {
        displayedMetrics: [
          'WPTMetricFirstViewSpeedIndex',
          'WPTMetricRepeatViewSpeedIndex',
          'WPTMetricFirstViewFirstPaint',
          'WPTMetricRepeatViewFirstPaint',
        ],
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
