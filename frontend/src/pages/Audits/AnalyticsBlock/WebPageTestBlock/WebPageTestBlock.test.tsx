import {
  cleanup,
  fireEvent,
  getByDisplayValue,
  getByTestId,
  queryByTestId,
  render,
} from '@testing-library/react';
import { state } from '__fixtures__/state';
import dayjs from 'dayjs';
import 'jest-dom/extend-expect';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import WebPageTestBlock from '../WebPageTestBlock';

afterEach(cleanup);

const mockStore = configureMockStore();
const store = mockStore(state);

const pageAuditResultId = '5555';
const pageAuditResultDate = dayjs('2019-05-11T00:00:00.000000+00:00');
const pageAuditResultValue = 11;

const pageAuditResult = {
  auditId: pageAuditResultId,
  createdAt: pageAuditResultDate,
  WPTResultsJsonUrl: 'https://www.webpagetest.org/jsonResult.php?test=1',
  WPTResultsUserUrl: 'https://www.webpagetest.org/result/1/',
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
};

const pageAuditResultIdCompare = '6666';
const pageAuditResultToCompare = {
  auditId: pageAuditResultIdCompare,
  createdAt: pageAuditResultDate,
  WPTResultsJsonUrl: 'https://www.webpagetest.org/jsonResult.php?test=1',
  WPTResultsUserUrl: 'https://www.webpagetest.org/result/1/',
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
};

test('Block messages render', () => {
  const { container } = render(
    <Provider store={store}>
      <IntlProvider>
        <WebPageTestBlock
          auditResults={[pageAuditResult, pageAuditResultToCompare]}
          blockMargin=""
        />
      </IntlProvider>
    </Provider>,
  );

  expect(getByTestId(container, 'title')).toHaveTextContent('Audits.webpagetest_detailed_results');
  expect(getByTestId(container, 'subtitle')).toHaveTextContent('Audits.webpagetest_choose_results');
});

test('Date selector block appears and disappears', () => {
  const { container } = render(
    <Provider store={store}>
      <IntlProvider>
        <WebPageTestBlock
          auditResults={[pageAuditResult, pageAuditResultToCompare]}
          blockMargin=""
        />
      </IntlProvider>
    </Provider>,
  );

  expect(queryByTestId(container, 'select-dates-form')).toBeNull();

  fireEvent.click(getByDisplayValue(container, 'dateSelector'));
  expect(getByTestId(container, 'select-dates-form')).toBeVisible();

  fireEvent.click(getByDisplayValue(container, 'latest'));
  expect(queryByTestId(container, 'select-dates-form')).toBeNull();

  fireEvent.click(getByDisplayValue(container, 'dateComparator'));
  expect(getByTestId(container, 'select-dates-form')).toBeVisible();
});
