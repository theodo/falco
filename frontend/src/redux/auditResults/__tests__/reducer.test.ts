import dayjs from 'dayjs';
import { fetchAuditResultsSuccess } from '../actions';
import reducer, { AuditResultsState } from '../reducer';

const initialPageAuditParametersId = '1111';
const initialPageId = '2222';
const initialPageAuditResultId = '5555';
const initialPageAuditResultDate = dayjs('2019-05-11T00:00:00.000000+00:00');
const initialPageAuditResultValue = 11;

const initialPageAuditResult = {
  [initialPageAuditResultId]: {
    auditId: initialPageAuditResultId,
    createdAt: initialPageAuditResultDate,
    WPTResultsJsonUrl: '',
    WPTResultsUserUrl: '',
    WPTMetricFirstViewTTI: initialPageAuditResultValue,
    WPTMetricRepeatViewTTI: initialPageAuditResultValue,
    WPTMetricFirstViewSpeedIndex: initialPageAuditResultValue,
    WPTMetricRepeatViewSpeedIndex: initialPageAuditResultValue,
    WPTMetricFirstViewFirstPaint: initialPageAuditResultValue,
    WPTMetricRepeatViewFirstPaint: initialPageAuditResultValue,
    WPTMetricFirstViewFirstMeaningfulPaint: initialPageAuditResultValue,
    WPTMetricRepeatViewFirstMeaningfulPaint: initialPageAuditResultValue,
    WPTMetricFirstViewLoadTime: initialPageAuditResultValue,
    WPTMetricRepeatViewLoadTime: initialPageAuditResultValue,
    WPTMetricFirstViewFirstContentfulPaint: initialPageAuditResultValue,
    WPTMetricRepeatViewFirstContentfulPaint: initialPageAuditResultValue,
    WPTMetricFirstViewTimeToFirstByte: initialPageAuditResultValue,
    WPTMetricRepeatViewTimeToFirstByte: initialPageAuditResultValue,
    WPTMetricLighthousePerformance: initialPageAuditResultValue,
    scriptStepName: null,
    scriptStepNumber: null,
  },
};

const initialScriptAuditParametersId = '3333';
const initialScriptId = '4444';
const initialScriptAuditResultId = '7777';
const initialScriptAuditResultDate = dayjs('2019-05-22T00:00:00.000000+00:00');
const initialScriptAuditResultValue = 22;
const initialScriptAuditStepName = 'Script Step 2';
const initialScriptAuditStepNumber = '2';

const initialScriptAuditResult = {
  [initialScriptAuditResultId]: {
    auditId: initialScriptAuditResultId,
    createdAt: initialScriptAuditResultDate,
    WPTResultsJsonUrl: '',
    WPTResultsUserUrl: '',
    WPTMetricFirstViewTTI: initialScriptAuditResultValue,
    WPTMetricRepeatViewTTI: initialScriptAuditResultValue,
    WPTMetricFirstViewSpeedIndex: initialScriptAuditResultValue,
    WPTMetricRepeatViewSpeedIndex: initialScriptAuditResultValue,
    WPTMetricFirstViewFirstPaint: initialScriptAuditResultValue,
    WPTMetricRepeatViewFirstPaint: initialScriptAuditResultValue,
    WPTMetricFirstViewFirstMeaningfulPaint: initialScriptAuditResultValue,
    WPTMetricRepeatViewFirstMeaningfulPaint: initialScriptAuditResultValue,
    WPTMetricFirstViewLoadTime: initialScriptAuditResultValue,
    WPTMetricRepeatViewLoadTime: initialScriptAuditResultValue,
    WPTMetricFirstViewFirstContentfulPaint: initialScriptAuditResultValue,
    WPTMetricRepeatViewFirstContentfulPaint: initialScriptAuditResultValue,
    WPTMetricFirstViewTimeToFirstByte: initialScriptAuditResultValue,
    WPTMetricRepeatViewTimeToFirstByte: initialScriptAuditResultValue,
    WPTMetricLighthousePerformance: initialScriptAuditResultValue,
    scriptStepName: initialScriptAuditStepName,
    scriptStepNumber: initialScriptAuditStepNumber,
  },
};

const initialState: AuditResultsState = {
  byAuditId: { ...initialPageAuditResult, ...initialScriptAuditResult },
  sortedByPageId: {
    [initialPageId]: {
      byAuditParametersId: {
        [initialPageAuditParametersId]: [initialPageAuditResultId],
      },
    },
  },
  sortedByScriptId: {
    [initialScriptId]: {
      byAuditParametersId: {
        [initialScriptAuditParametersId]: {
          [initialScriptAuditStepNumber]: [initialScriptAuditResultId],
        },
      },
    },
  },
};

const newPageAuditParametersId = 'NEW-1111';
const newPageId = 'NEW-2222';
const newPageAuditResultId = 'NEW-5555';
const newPageAuditResultDate = dayjs('2019-06-11T00:00:00.000000+00:00');
const newPageAuditResultValue = 1111;

const newPageAuditResultModelized = {
  [newPageAuditResultId]: {
    auditId: newPageAuditResultId,
    createdAt: newPageAuditResultDate,
    WPTResultsJsonUrl: '',
    WPTResultsUserUrl: '',
    WPTMetricFirstViewTTI: newPageAuditResultValue,
    WPTMetricRepeatViewTTI: newPageAuditResultValue,
    WPTMetricFirstViewSpeedIndex: newPageAuditResultValue,
    WPTMetricRepeatViewSpeedIndex: newPageAuditResultValue,
    WPTMetricFirstViewFirstPaint: newPageAuditResultValue,
    WPTMetricRepeatViewFirstPaint: newPageAuditResultValue,
    WPTMetricFirstViewFirstMeaningfulPaint: newPageAuditResultValue,
    WPTMetricRepeatViewFirstMeaningfulPaint: newPageAuditResultValue,
    WPTMetricFirstViewLoadTime: newPageAuditResultValue,
    WPTMetricRepeatViewLoadTime: newPageAuditResultValue,
    WPTMetricFirstViewFirstContentfulPaint: newPageAuditResultValue,
    WPTMetricRepeatViewFirstContentfulPaint: newPageAuditResultValue,
    WPTMetricFirstViewTimeToFirstByte: newPageAuditResultValue,
    WPTMetricRepeatViewTimeToFirstByte: newPageAuditResultValue,
    WPTMetricLighthousePerformance: newPageAuditResultValue,
    scriptStepName: null,
    scriptStepNumber: null,
  },
};

const newScriptAuditParametersId = 'NEW-3333';
const newScriptId = 'NEW-4444';
const newScriptAuditResultId = 'NEW-7777';
const newScriptAuditResultDate = dayjs('2019-06-22T00:00:00.000000+00:00');
const newScriptAuditResultValue = 2222;
const newScriptAuditStepName = 'NEW Script Step 2';
const newScriptAuditStepNumber = '22';

const newScriptAuditResultModelized = {
  [newScriptAuditResultId]: {
    auditId: newScriptAuditResultId,
    createdAt: newScriptAuditResultDate,
    WPTResultsJsonUrl: '',
    WPTResultsUserUrl: '',
    WPTMetricFirstViewTTI: newScriptAuditResultValue,
    WPTMetricRepeatViewTTI: newScriptAuditResultValue,
    WPTMetricFirstViewSpeedIndex: newScriptAuditResultValue,
    WPTMetricRepeatViewSpeedIndex: newScriptAuditResultValue,
    WPTMetricFirstViewFirstPaint: newScriptAuditResultValue,
    WPTMetricRepeatViewFirstPaint: newScriptAuditResultValue,
    WPTMetricFirstViewFirstMeaningfulPaint: newScriptAuditResultValue,
    WPTMetricRepeatViewFirstMeaningfulPaint: newScriptAuditResultValue,
    WPTMetricFirstViewLoadTime: newScriptAuditResultValue,
    WPTMetricRepeatViewLoadTime: newScriptAuditResultValue,
    WPTMetricFirstViewFirstContentfulPaint: newScriptAuditResultValue,
    WPTMetricRepeatViewFirstContentfulPaint: newScriptAuditResultValue,
    WPTMetricFirstViewTimeToFirstByte: newScriptAuditResultValue,
    WPTMetricRepeatViewTimeToFirstByte: newScriptAuditResultValue,
    WPTMetricLighthousePerformance: newScriptAuditResultValue,
    scriptStepName: newScriptAuditStepName,
    scriptStepNumber: newScriptAuditStepNumber,
  },
};

describe('AuditResults reducer', () => {
  describe('FETCH_AUDIT_RESULTS_SUCCESS case', () => {
    describe('For audit results of `page` type', () => {
      it('When pageId already exists, should add audit results in existing key', () => {
        const action = fetchAuditResultsSuccess({
          byAuditId: newPageAuditResultModelized,
          auditParametersId: newPageAuditParametersId,
          pageId: initialPageId,
          scriptId: undefined,
          sortedAuditResultsIds: [newPageAuditResultId],
        });
        const expectedState = {
          ...initialState,
          byAuditId: {
            ...initialState.byAuditId,
            ...newPageAuditResultModelized,
          },
          sortedByPageId: {
            ...initialState.sortedByPageId,
            [initialPageId]: {
              byAuditParametersId: {
                ...initialState.sortedByPageId[initialPageId].byAuditParametersId,
                [newPageAuditParametersId]: [newPageAuditResultId],
              },
            },
          },
        };

        expect(reducer(initialState, action)).toEqual(expectedState);
      });

      it('When pageId does not exist, should create key in store and add audit results in this new key', () => {
        const action = fetchAuditResultsSuccess({
          byAuditId: newPageAuditResultModelized,
          auditParametersId: newPageAuditParametersId,
          pageId: newPageId,
          scriptId: undefined,
          sortedAuditResultsIds: [newPageAuditResultId],
        });
        const expectedState = {
          ...initialState,
          byAuditId: {
            ...initialState.byAuditId,
            ...newPageAuditResultModelized,
          },
          sortedByPageId: {
            ...initialState.sortedByPageId,
            [newPageId]: {
              byAuditParametersId: {
                [newPageAuditParametersId]: [newPageAuditResultId],
              },
            },
          },
        };

        expect(reducer(initialState, action)).toEqual(expectedState);
      });
    });
  });

  describe('For audit results of `script` type', () => {
    it('When scriptId already exists, should add audit results in existing key', () => {
      const action = fetchAuditResultsSuccess({
        byAuditId: newScriptAuditResultModelized,
        auditParametersId: newScriptAuditParametersId,
        pageId: undefined,
        scriptId: initialScriptId,
        sortedAuditResultsIds: { [newScriptAuditStepNumber]: [newScriptAuditResultId] },
      });
      const expectedState = {
        ...initialState,
        byAuditId: {
          ...initialState.byAuditId,
          ...newScriptAuditResultModelized,
        },
        sortedByScriptId: {
          ...initialState.sortedByScriptId,
          [initialScriptId]: {
            byAuditParametersId: {
              ...initialState.sortedByScriptId[initialScriptId].byAuditParametersId,
              [newScriptAuditParametersId]: {
                [newScriptAuditStepNumber]: [newScriptAuditResultId],
              },
            },
          },
        },
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  it('When scriptId does not exist, should create key in store and add audit results in this new key', () => {
    const action = fetchAuditResultsSuccess({
      byAuditId: newScriptAuditResultModelized,
      auditParametersId: newScriptAuditParametersId,
      pageId: undefined,
      scriptId: newScriptId,
      sortedAuditResultsIds: { [newScriptAuditStepNumber]: [newScriptAuditResultId] },
    });
    const expectedState = {
      ...initialState,
      byAuditId: {
        ...initialState.byAuditId,
        ...newScriptAuditResultModelized,
      },
      sortedByScriptId: {
        ...initialState.sortedByScriptId,
        [newScriptId]: {
          byAuditParametersId: {
            [newScriptAuditParametersId]: {
              [newScriptAuditStepNumber]: [newScriptAuditResultId],
            },
          },
        },
      },
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
