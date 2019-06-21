import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Column,
  ColumnsContainer,
  Metric,
  MetricInnerwrap,
  MetricTitle,
  MetricValue,
} from './LighthouseMetrics.style';

// TODO to move in ticket 334
export interface LighthouseMetricsType {
  displayedValue: string;
  score: number;
}

export interface LighthouseResultType {
  [key: string]: LighthouseMetricsType;
}

// TODO to remove in ticket 334
const LighthouseMetrics: React.FunctionComponent = () => {
  const TTI: LighthouseMetricsType = { displayedValue: '1.2 s', score: 0.9 };
  const SpeedIndex: LighthouseMetricsType = { displayedValue: '3.2 s', score: 0.3 };
  const FirstContentfulPaint: LighthouseMetricsType = { displayedValue: '2.2 s', score: 0.7 };
  const FirstMeaningfulPaint: LighthouseMetricsType = { displayedValue: '3.2 s', score: 0.3 };
  const FirstCPUIdle: LighthouseMetricsType = { displayedValue: '3.2 s', score: 0.3 };
  const MaxPotentialFirstInputDelay: LighthouseMetricsType = {
    displayedValue: '3.2 s',
    score: 0.3,
  };

  const result: LighthouseResultType = {
    LighthouseTTI: TTI,
    LighthouseSpeedIndex: SpeedIndex,
    LighthouseFirstContentfulPaint: FirstContentfulPaint,
    LighthouseFirstMeaningfulPaint: FirstMeaningfulPaint,
    LighthouseFirstCPUIdle: FirstCPUIdle,
    LighthouseMaxPotentialFirstInputDelay: MaxPotentialFirstInputDelay,
  };

  const metrics = [
    ['LighthouseFirstContentfulPaint', 'LighthouseSpeedIndex', 'LighthouseTTI'],
    [
      'LighthouseFirstMeaningfulPaint',
      'LighthouseFirstCPUIdle',
      'LighthouseMaxPotentialFirstInputDelay',
    ],
  ];

  // TODO maybe create an enum for these constants
  const FAIL = 'FAIL';
  const AVERAGE = 'AVERAGE';
  const PASS = 'PASS';

  const metricState = (metric: LighthouseMetricsType): 'FAIL' | 'AVERAGE' | 'PASS' => {
    return metric.score < 0.5 ? FAIL : metric.score < 0.8 ? AVERAGE : PASS;
  };

  return (
    <ColumnsContainer>
      {metrics.map((column: string[]) => (
        <Column>
          {column.map((metric: string) => (
            <Metric>
              <MetricInnerwrap state={metricState(result[metric])}>
                <MetricTitle>
                  <FormattedMessage id={`Metrics.${metric}`} />
                </MetricTitle>
                <MetricValue state={metricState(result[metric])}>{result[metric].displayedValue}</MetricValue>
              </MetricInnerwrap>
            </Metric>
          ))}
        </Column>
      ))}
    </ColumnsContainer>
  );
};

export default LighthouseMetrics;
