import { PersistState } from 'redux-persist';
import { MetricType } from 'redux/auditResults/types';
import {
  setCurrentAuditParametersId,
  setCurrentPageId,
  setCurrentScriptId,
  setCurrentScriptStepId,
  updateDisplayedMetrics,
} from '../actions';
import reducer, { ParametersState } from '../reducer';

const initialState: ParametersState = {
  currentAuditParametersId: '11111-22222-33333-44444',
  currentPageId: 'Page-1234',
  currentScriptId: 'Script-1234',
  currentScriptStepId: 'ScriptStep-1234',
  displayedMetrics: {},
  _persist: {} as PersistState,
};

describe('Parameters reducer', () => {
  describe('UPDATE_DISPLAYED_METRICS case', () => {
    const projectId = '12345';

    it('Should return an empty list when no metric is set to be displayed', () => {
      const action = updateDisplayedMetrics({ displayedMetrics: [], projectId });
      const expectedState = { ...initialState, displayedMetrics: { [projectId]: [] } };

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

      const expectedState = {
        ...initialState,
        displayedMetrics: { [projectId]: displayedMetrics },
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('SET_CURRENT_AUDIT_PARAMETERS_ID case', () => {
    const auditParametersId = '55555-66666-77777-88888';

    it('Should return null when no auditParametersId is submitted', () => {
      const action = setCurrentAuditParametersId({ auditParametersId: undefined });
      const expectedState = { ...initialState, currentAuditParametersId: null };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
    it('Should return submitted value when auditParametersId is submitted', () => {
      const action = setCurrentAuditParametersId({ auditParametersId });
      const expectedState = { ...initialState, currentAuditParametersId: auditParametersId };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('SET_CURRENT_PAGE_ID case', () => {
    const pageId = 'Page-5678';

    it('Should return null when no pageId is submitted', () => {
      const action = setCurrentPageId({ pageId: undefined });
      const expectedState = { ...initialState, currentPageId: null };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
    it('Should return submitted value when pageId is submitted', () => {
      const action = setCurrentPageId({ pageId });
      const expectedState = { ...initialState, currentPageId: pageId };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('SET_CURRENT_SCRIPT_ID case', () => {
    const scriptId = 'Script-5678';

    it('Should return null when no scriptId is submitted', () => {
      const action = setCurrentScriptId({ scriptId: undefined });
      const expectedState = { ...initialState, currentScriptId: null };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
    it('Should return submitted value when scriptId is submitted', () => {
      const action = setCurrentScriptId({ scriptId });
      const expectedState = { ...initialState, currentScriptId: scriptId };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('SET_CURRENT_SCRIPT_STEP_ID case', () => {
    const scriptStepId = 'ScriptStep-5678';

    it('Should return null when no scriptStepId is submitted', () => {
      const action = setCurrentScriptStepId({ scriptStepId: undefined });
      const expectedState = { ...initialState, currentScriptStepId: null };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
    it('Should return submitted value when scriptStepId is submitted', () => {
      const action = setCurrentScriptStepId({ scriptStepId });
      const expectedState = { ...initialState, currentScriptStepId: scriptStepId };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
