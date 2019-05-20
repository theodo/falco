import { state } from '__fixtures__/state';
import * as selectors from 'redux/selectors';
import { getMetricsToDisplay } from '../selectors';

const projectId = '12345';
const defaultMetrics = [
  'WPTMetricFirstViewTTI',
  'WPTMetricFirstViewSpeedIndex',
  'WPTMetricFirstViewLoadTime',
];
const customMetrics = ['WPTMetricFirstViewFirstPaint', 'WPTMetricRepeatViewFirstPaint'];
const initialState = {
  ...state,
  parameters: {
    displayedMetrics: { [projectId]: customMetrics },
  },
};

describe('Parameters selectors', () => {
  describe('getMetricsToDisplay function', () => {
    it('Should return the default value when the projectId does not exist in the paramaters store', () => {
      const mockedGetCurrentProjectId = jest.spyOn(selectors, 'getCurrentProjectId');
      mockedGetCurrentProjectId.mockReturnValue('I do not exist in the paramaters store');
      expect(getMetricsToDisplay(initialState)).toEqual(defaultMetrics);
    });
    it('Should return the custom value when the projectId exists', () => {
      const mockedGetCurrentProjectId = jest.spyOn(selectors, 'getCurrentProjectId');
      mockedGetCurrentProjectId.mockReturnValue(projectId);
      expect(getMetricsToDisplay(initialState)).toEqual(customMetrics);
    });
  });
});
