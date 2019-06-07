import {
  cleanup,
  fireEvent,
  getByDisplayValue,
  getByTestId,
  queryByTestId,
  render,
} from '@testing-library/react';
import dayjs from 'dayjs';
import 'jest-dom/extend-expect';
import React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import intlfr from 'react-intl/locale-data/fr';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { state } from '__fixtures__/state';
import fr from 'translations/fr.json';
import WebPageTestBlock from '..';

afterEach(cleanup);
addLocaleData(intlfr);

// TODO: To remove once we figure out how to pass translations
const consoleError = console.error.bind(console);
// eslint-disable-next-line
console.error = (message: string, ...args: any) => {
  if (
    message.startsWith('[React Intl] Cannot format message') ||
    message.startsWith('[React Intl] Missing message')
  ) {
    return;
  }
  consoleError(message, ...args);
};

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

const pageAuditResultToCompare = pageAuditResult
pageAuditResultToCompare.auditId ='6666'


describe('WebPageTestBlock', () => {
  describe('Date selection block', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale={'fr'} messages={fr}>
          <WebPageTestBlock
            auditResults={[pageAuditResult, pageAuditResultToCompare]}
            blockMargin=""
          />
        </IntlProvider>
      </Provider>,
    );
    test('should be zero then one then zero then one', () => {
      // Date selection is invisible by default
      expect(queryByTestId(container, 'select-dates-form')).toBeNull();

      // When user selects "specific date" then date selection should be visible
      fireEvent.click(getByDisplayValue(container, 'dateSelector'));
      expect(getByTestId(container, 'select-dates-form')).toBeVisible();

      // If user selects "latest date" then data selection should not be present
      fireEvent.click(getByDisplayValue(container, 'latest'));
      expect(queryByTestId(container, 'select-dates-form')).toBeNull();

      // If user selects "compare dates" then date selection should be visible
      fireEvent.click(getByDisplayValue(container, 'dateComparator'));
      expect(getByTestId(container, 'select-dates-form')).toBeVisible();
    });
  });
});
