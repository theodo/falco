import { PersistState } from "redux-persist";
import { MetricType } from 'redux/auditResults/types';
import { setCurrentAuditParametersId, updateDisplayedMetrics } from '../actions';
import reducer, { ParametersState } from '../reducer';

const initialState: ParametersState = {
  currentAuditParametersId: '11111-22222-33333-44444',
  displayedMetrics: {},
  _persist: {} as PersistState,
};

describe('Parameters reducer', () => {
  describe('UPDATE_DISPLAYED_METRICS case', () => {
    const projectId = '12345';

    it('Should return an empty list when no metric is set to be displayed', () => {
      const action = updateDisplayedMetrics({ displayedMetrics: [], projectId });
      const expectedState = {...initialState, displayedMetrics: { [projectId]: [] } };

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

      const expectedState = {...initialState, displayedMetrics: { [projectId]: displayedMetrics } };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('SET_AUDIT_PARAMETERS case', () => {
    const auditParametersId = '55555-66666-77777-88888';

    it('Should return null when no auditParametersId is submitted', () => {
      const action = setCurrentAuditParametersId({auditParametersId: undefined});
      const expectedState = {...initialState, currentAuditParametersId: null };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
    it('Should return submitted value when auditParametersId is submitted', () => {
      const action = setCurrentAuditParametersId({auditParametersId});
      const expectedState = {...initialState, currentAuditParametersId: auditParametersId };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
