import dayjs from 'dayjs';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { makeGetRequest } from 'services/networking/request';

import { fetchAuditResultsRequest, fetchAuditResultsSuccess } from '../actions';
import { fetchAuditResults } from '../sagas';

const pageActionAuditParametersId = '1111';
const pageActionPageOrScriptId = '2222';
const fetchAuditResultsRequestPageAction = fetchAuditResultsRequest({
  auditParametersId: pageActionAuditParametersId,
  pageOrScriptId: pageActionPageOrScriptId,
  type: 'page',
});

const scriptActionAuditParametersId = '3333';
const scriptActionPageOrScriptId = '4444';
const fetchAuditResultsRequestScriptAction = fetchAuditResultsRequest({
  auditParametersId: scriptActionAuditParametersId,
  pageOrScriptId: scriptActionPageOrScriptId,
  type: 'script',
});

const pageAuditResultId = '5555';
const pageAuditId = '6666';
const pageAuditResultDate = dayjs('2019-05-11T00:00:00.000000+00:00');
const pageAuditResultValue = 11;
const pageAuditResultLighthouseDisplayedValue = '3,2 s';
const pageAuditResultLighthouseScore = 0.6;
/* eslint-disable @typescript-eslint/camelcase */
const pageAuditResultAPI = [
  {
    uuid: pageAuditResultId,
    audit: {
      uuid: pageAuditId,
      parameters: pageActionAuditParametersId,
      page: pageActionPageOrScriptId,
      script: null,
    },
    created_at: pageAuditResultDate,
    wpt_results_json_url: '',
    wpt_results_user_url: '',
    wpt_metric_first_view_tti: pageAuditResultValue,
    wpt_metric_repeat_view_tti: pageAuditResultValue,
    wpt_metric_first_view_speed_index: pageAuditResultValue,
    wpt_metric_repeat_view_speed_index: pageAuditResultValue,
    wpt_metric_first_view_first_paint: pageAuditResultValue,
    wpt_metric_repeat_view_first_paint: pageAuditResultValue,
    wpt_metric_first_view_first_meaningful_paint: pageAuditResultValue,
    wpt_metric_repeat_view_first_meaningful_paint: pageAuditResultValue,
    wpt_metric_first_view_load_time: pageAuditResultValue,
    wpt_metric_repeat_view_load_time: pageAuditResultValue,
    wpt_metric_first_view_first_contentful_paint: pageAuditResultValue,
    wpt_metric_repeat_view_first_contentful_paint: pageAuditResultValue,
    wpt_metric_first_view_time_to_first_byte: pageAuditResultValue,
    wpt_metric_repeat_view_time_to_first_byte: pageAuditResultValue,
    wpt_metric_first_view_visually_complete: pageAuditResultValue,
    wpt_metric_repeat_view_visually_complete: pageAuditResultValue,
    wpt_metric_lighthouse_performance: pageAuditResultValue,
    script_step_name: null,
    script_step_number: null,
    lh_metric_tti_displayed_value: pageAuditResultLighthouseDisplayedValue,
    lh_metric_tti_score: pageAuditResultLighthouseScore,
    lh_metric_first_contentful_paint_displayed_value: pageAuditResultLighthouseDisplayedValue,
    lh_metric_first_contentful_paint_score: pageAuditResultLighthouseScore,
    lh_metric_speed_index_displayed_value: pageAuditResultLighthouseDisplayedValue,
    lh_metric_speed_index_score: pageAuditResultLighthouseScore,
    lh_metric_first_meaningful_paint_displayed_value: pageAuditResultLighthouseDisplayedValue,
    lh_metric_first_meaningful_paint_score: pageAuditResultLighthouseScore,
    lh_metric_first_cpu_idle_displayed_value: pageAuditResultLighthouseDisplayedValue,
    lh_metric_first_cpu_idle_score: pageAuditResultLighthouseScore,
    lh_metric_max_potential_first_input_delay_displayed_value: pageAuditResultLighthouseDisplayedValue,
    lh_metric_max_potential_first_input_delay_score: pageAuditResultLighthouseScore,
  },
];

const pageAuditResultModelized = {
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
    WPTMetricFirstViewVisuallyComplete: pageAuditResultValue,
    WPTMetricRepeatViewVisuallyComplete: pageAuditResultValue,
    WPTMetricLighthousePerformance: pageAuditResultValue,
    scriptStepName: null,
    scriptStepNumber: null,
    lighthouseTTI: {
      displayedValue: pageAuditResultLighthouseDisplayedValue,
      score: pageAuditResultLighthouseScore,
    },
    lighthouseSpeedIndex: {
      displayedValue: pageAuditResultLighthouseDisplayedValue,
      score: pageAuditResultLighthouseScore,
    },
    lighthouseFirstContentfulPaint: {
      displayedValue: pageAuditResultLighthouseDisplayedValue,
      score: pageAuditResultLighthouseScore,
    },
    lighthouseFirstMeaningfulPaint: {
      displayedValue: pageAuditResultLighthouseDisplayedValue,
      score: pageAuditResultLighthouseScore,
    },
    lighthouseFirstCPUIdle: {
      displayedValue: pageAuditResultLighthouseDisplayedValue,
      score: pageAuditResultLighthouseScore,
    },
    lighthouseMaxPotentialFirstInputDelay: {
      displayedValue: pageAuditResultLighthouseDisplayedValue,
      score: pageAuditResultLighthouseScore,
    },
  },
};

const scriptAuditResultId = '7777';
const scriptAuditId = '8888';
const scriptAuditResultDate = dayjs('2019-05-22T00:00:00.000000+00:00');
const scriptAuditResultValue = 22;
const scriptAuditStepName = 'Script Step 2';
const scriptAuditStepNumber = '2';
const scriptAuditResultAPI = [
  {
    uuid: scriptAuditResultId,
    audit: {
      uuid: scriptAuditId,
      parameters: scriptActionAuditParametersId,
      page: null,
      script: scriptActionPageOrScriptId,
    },
    created_at: scriptAuditResultDate,
    wpt_results_json_url: '',
    wpt_results_user_url: '',
    wpt_metric_first_view_tti: scriptAuditResultValue,
    wpt_metric_repeat_view_tti: scriptAuditResultValue,
    wpt_metric_first_view_speed_index: scriptAuditResultValue,
    wpt_metric_repeat_view_speed_index: scriptAuditResultValue,
    wpt_metric_first_view_first_paint: scriptAuditResultValue,
    wpt_metric_repeat_view_first_paint: scriptAuditResultValue,
    wpt_metric_first_view_first_meaningful_paint: scriptAuditResultValue,
    wpt_metric_repeat_view_first_meaningful_paint: scriptAuditResultValue,
    wpt_metric_first_view_load_time: scriptAuditResultValue,
    wpt_metric_repeat_view_load_time: scriptAuditResultValue,
    wpt_metric_first_view_first_contentful_paint: scriptAuditResultValue,
    wpt_metric_repeat_view_first_contentful_paint: scriptAuditResultValue,
    wpt_metric_first_view_time_to_first_byte: scriptAuditResultValue,
    wpt_metric_repeat_view_time_to_first_byte: scriptAuditResultValue,
    wpt_metric_first_view_visually_complete: scriptAuditResultValue,
    wpt_metric_repeat_view_visually_complete: scriptAuditResultValue,
    wpt_metric_lighthouse_performance: scriptAuditResultValue,
    script_step_name: scriptAuditStepName,
    script_step_number: scriptAuditStepNumber,
    lh_metric_tti_displayed_value: null,
    lh_metric_tti_score: null,
    lh_metric_first_contentful_paint_displayed_value: null,
    lh_metric_first_contentful_paint_score: null,
    lh_metric_speed_index_displayed_value: null,
    lh_metric_speed_index_score: null,
    lh_metric_first_meaningful_paint_displayed_value: null,
    lh_metric_first_meaningful_paint_score: null,
    lh_metric_first_cpu_idle_displayed_value: null,
    lh_metric_first_cpu_idle_score: null,
    lh_metric_max_potential_first_input_delay_displayed_value: null,
    lh_metric_max_potential_first_input_delay_score: null,
  },
];

const scriptAuditResultModelized = {
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
    WPTMetricFirstViewVisuallyComplete: scriptAuditResultValue,
    WPTMetricRepeatViewVisuallyComplete: scriptAuditResultValue,
    WPTMetricLighthousePerformance: scriptAuditResultValue,
    scriptStepName: scriptAuditStepName,
    scriptStepNumber: scriptAuditStepNumber,
    lighthouseTTI: {
      displayedValue: null,
      score: null,
    },
    lighthouseSpeedIndex: {
      displayedValue: null,
      score: null,
    },
    lighthouseFirstContentfulPaint: {
      displayedValue: null,
      score: null,
    },
    lighthouseFirstMeaningfulPaint: {
      displayedValue: null,
      score: null,
    },
    lighthouseFirstCPUIdle: {
      displayedValue: null,
      score: null,
    },
    lighthouseMaxPotentialFirstInputDelay: {
      displayedValue: null,
      score: null,
    },
  },
};
/* eslint-enable */

describe('[Saga] Fetch Audit Results', () => {
  describe('fetchAuditResults', () => {
    describe('for `page` type', () => {
      describe('when request is a success and result is empty', () => {
        it('should call the success action with empty result', async () => {
          return expectSaga(fetchAuditResults, fetchAuditResultsRequestPageAction)
            .provide([[matchers.call.fn(makeGetRequest), { body: [] }]])
            .put(
              fetchAuditResultsSuccess({
                byAuditId: {},
                auditParametersId: pageActionAuditParametersId,
                pageId: pageActionPageOrScriptId,
                scriptId: undefined,
                sortedAuditResultsIds: [],
              }),
            )
            .run();
        });
      });
      describe('when request is a success and result is not empty', () => {
        it('should call the success action with normalized result', async () => {
          return expectSaga(fetchAuditResults, fetchAuditResultsRequestPageAction)
            .provide([[matchers.call.fn(makeGetRequest), { body: pageAuditResultAPI }]])
            .put(
              fetchAuditResultsSuccess({
                byAuditId: pageAuditResultModelized,
                auditParametersId: pageActionAuditParametersId,
                pageId: pageActionPageOrScriptId,
                scriptId: undefined,
                sortedAuditResultsIds: [pageAuditResultId],
              }),
            )
            .run();
        });
      });
    });

    describe('for `script` type', () => {
      describe('when request is a success and result is empty', () => {
        it('should call the success action with empty result', async () => {
          return expectSaga(fetchAuditResults, fetchAuditResultsRequestScriptAction)
            .provide([[matchers.call.fn(makeGetRequest), { body: [] }]])
            .put(
              fetchAuditResultsSuccess({
                byAuditId: {},
                auditParametersId: scriptActionAuditParametersId,
                pageId: undefined,
                scriptId: scriptActionPageOrScriptId,
                sortedAuditResultsIds: {},
              }),
            )
            .run();
        });
      });
      describe('when request is a success and result is not empty', () => {
        it('should call the success action with normalized result', async () => {
          return expectSaga(fetchAuditResults, fetchAuditResultsRequestScriptAction)
            .provide([[matchers.call.fn(makeGetRequest), { body: scriptAuditResultAPI }]])
            .put(
              fetchAuditResultsSuccess({
                byAuditId: scriptAuditResultModelized,
                auditParametersId: scriptActionAuditParametersId,
                pageId: undefined,
                scriptId: scriptActionPageOrScriptId,
                sortedAuditResultsIds: { [scriptAuditStepNumber]: [scriptAuditResultId] },
              }),
            )
            .run();
        });
      });
    });
  });
});
