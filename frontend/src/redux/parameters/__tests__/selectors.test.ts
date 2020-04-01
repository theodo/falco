import { state } from '__fixtures__/state';
import {MetricType} from "redux/auditResults/types";
import * as selectors from 'redux/selectors';
import { getMetricsToDisplay } from '../selectors';

const projectId = '12345';
const customMetrics: MetricType[] = ['WPTMetricFirstViewFirstPaint', 'WPTMetricRepeatViewFirstPaint'];
const initialState = {
  ...state,
  parameters: {
    ...state.parameters,
    displayedMetrics: { [projectId]: customMetrics },
  },
};

describe('Parameters selectors', () => {
  describe('getMetricsToDisplay function', () => {
    it('Should return the custom value when the projectId exists', () => {
      const mockedGetCurrentProjectId = jest.spyOn(selectors, 'getCurrentProjectId');
      mockedGetCurrentProjectId.mockReturnValue(projectId);
      expect(getMetricsToDisplay(initialState)).toEqual(customMetrics);
    });
  });
});
