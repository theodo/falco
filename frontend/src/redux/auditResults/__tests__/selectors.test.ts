import { state } from '__fixtures__/state';
import dayjs from 'dayjs';
import {
  selectAuditScriptSteps,
  selectPageAuditResultsIds,
  selectScriptAuditResultsIds,
} from '../selectors';

const pageAuditParametersId = '1111';
const pageId = '2222';
const pageAuditResultId = '5555';
const pageAuditResultDate = dayjs('2019-05-11T00:00:00.000000+00:00');
const pageAuditResultValue = 11;

const pageAuditResult = {
  [pageAuditResultId]: {
    auditId: pageAuditResultId,
    createdAt: pageAuditResultDate,
    WPTResultsJsonUrl: '',
    WPTResultsUserUrl: '',
    WPTMetricFirstViewTTI: pageAuditResultValue,
    WPTMetricRepeatViewTTI: pageAuditResultValue,
    WPTMetricFirstViewSpeedIndex: pageAuditResultValue,
    WPTMetricRepeatViewSpeedIndex: pageAuditResultValue,
    WPTMetricFirstViewFirstPaint: pageAuditResultValue,
    WPTMetricRepeatViewFirstPaint: pageAuditResultValue,
    WPTMetricFirstViewFirstMeaningfulPaint: pageAuditResultValue,
    WPTMetricRepeatViewFirstMeaningfulPaint: pageAuditResultValue,
    WPTMetricFirstViewLoadTime: pageAuditResultValue,
    WPTMetricRepeatViewLoadTime: pageAuditResultValue,
    WPTMetricFirstViewFirstContentfulPaint: pageAuditResultValue,
    WPTMetricRepeatViewFirstContentfulPaint: pageAuditResultValue,
    WPTMetricFirstViewTimeToFirstByte: pageAuditResultValue,
    WPTMetricRepeatViewTimeToFirstByte: pageAuditResultValue,
    WPTMetricLighthousePerformance: pageAuditResultValue,
    scriptStepName: null,
    scriptStepNumber: null,
  },
};

const scriptAuditParametersId = '3333';
const scriptId = '4444';
const scriptAuditResultId = '7777';
const scriptAuditResultDate = dayjs('2019-05-22T00:00:00.000000+00:00');
const scriptAuditResultValue = 22;
const scriptAuditStepName = 'Script Step 2';
const scriptAuditStepNumber = '2';

const scriptAuditResult = {
  [scriptAuditResultId]: {
    auditId: scriptAuditResultId,
    createdAt: scriptAuditResultDate,
    WPTResultsJsonUrl: '',
    WPTResultsUserUrl: '',
    WPTMetricFirstViewTTI: scriptAuditResultValue,
    WPTMetricRepeatViewTTI: scriptAuditResultValue,
    WPTMetricFirstViewSpeedIndex: scriptAuditResultValue,
    WPTMetricRepeatViewSpeedIndex: scriptAuditResultValue,
    WPTMetricFirstViewFirstPaint: scriptAuditResultValue,
    WPTMetricRepeatViewFirstPaint: scriptAuditResultValue,
    WPTMetricFirstViewFirstMeaningfulPaint: scriptAuditResultValue,
    WPTMetricRepeatViewFirstMeaningfulPaint: scriptAuditResultValue,
    WPTMetricFirstViewLoadTime: scriptAuditResultValue,
    WPTMetricRepeatViewLoadTime: scriptAuditResultValue,
    WPTMetricFirstViewFirstContentfulPaint: scriptAuditResultValue,
    WPTMetricRepeatViewFirstContentfulPaint: scriptAuditResultValue,
    WPTMetricFirstViewTimeToFirstByte: scriptAuditResultValue,
    WPTMetricRepeatViewTimeToFirstByte: scriptAuditResultValue,
    WPTMetricLighthousePerformance: scriptAuditResultValue,
    scriptStepName: scriptAuditStepName,
    scriptStepNumber: scriptAuditStepNumber,
  },
};

const initialState = {
  ...state,
  auditResults: {
    byAuditId: { ...pageAuditResult, ...scriptAuditResult },
    sortedByPageId: {
      [pageId]: {
        byAuditParametersId: {
          [pageAuditParametersId]: [pageAuditResultId],
        },
      },
    },
    sortedByScriptId: {
      [scriptId]: {
        byAuditParametersId: {
          [scriptAuditParametersId]: {
            [scriptAuditStepNumber]: [scriptAuditResultId],
          },
        },
      },
    },
  },
};

describe('AuditResults selectors', () => {
  describe('selectAuditScriptSteps function', () => {
    it('Should return an empty object when scriptId does not exist in store', () => {
      expect(selectAuditScriptSteps(initialState, scriptAuditParametersId, pageId)).toEqual({});
    });
    it('Should return an empty object when auditParametersId does not exist in store', () => {
      expect(selectAuditScriptSteps(initialState, pageAuditParametersId, scriptId)).toEqual({});
    });
    it('Should return an object containing all steps definition corresponding to requested scriptId and auditParametersId', () => {
      expect(selectAuditScriptSteps(initialState, scriptAuditParametersId, scriptId)).toEqual({
        [scriptAuditStepNumber]: scriptAuditStepName,
      });
    });
  });
  describe('selectPageAuditResultsIds function', () => {
    it('Should return null when pageId does not exist in store', () => {
      expect(selectPageAuditResultsIds(initialState, pageAuditParametersId, scriptId)).toEqual(
        null,
      );
    });
    it('Should return null when auditParametersId does not exist in store', () => {
      expect(selectPageAuditResultsIds(initialState, scriptAuditParametersId, pageId)).toEqual(
        null,
      );
    });
    it('Should return an array containing ids of audits corresponding to requested pageId and auditParametersId', () => {
      expect(selectPageAuditResultsIds(initialState, pageAuditParametersId, pageId)).toEqual([
        pageAuditResultId,
      ]);
    });
  });
  describe('selectScriptAuditResultsIds function', () => {
    it('Should return null when scriptId does not exist in store', () => {
      expect(selectScriptAuditResultsIds(initialState, scriptAuditParametersId, pageId)).toEqual(
        null,
      );
    });
    it('Should return null when auditParametersId does not exist in store', () => {
      expect(selectScriptAuditResultsIds(initialState, pageAuditParametersId, scriptId)).toEqual(
        null,
      );
    });
    it('Should return an array containing ids of audits corresponding to requested scriptId and auditParametersId', () => {
      expect(selectScriptAuditResultsIds(initialState, scriptAuditParametersId, scriptId)).toEqual({
        [scriptAuditStepNumber]: [scriptAuditResultId],
      });
    });
  });
});
