import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { AuditResultType, LighthouseMetricType } from 'redux/auditResults/types';
import {
  LIGHTHOUSE_AVERAGE_SCORE_THRESHOLD,
  LIGHTHOUSE_PASS_SCORE_THRESHOLD,
} from '../LighthouseScore/LighthouseScore';
import {
  Column,
  ColumnsContainer,
  Metric,
  MetricInnerwrap,
  MetricsContainer,
  MetricsHeader,
  MetricTitle,
  MetricValue,
} from './LighthouseMetrics.style';

export interface OwnProps {
  auditResult: AuditResultType;
}

const LighthouseMetrics: React.FunctionComponent<OwnProps> = ({ auditResult }) => {
  const metrics: LighthouseMetricType[][] = [
    ['lighthouseFirstContentfulPaint', 'lighthouseSpeedIndex', 'lighthouseTTI'],
    [
      'lighthouseFirstMeaningfulPaint',
      'lighthouseFirstCPUIdle',
      'lighthouseMaxPotentialFirstInputDelay',
    ],
  ];

  // TODO maybe create an enum for these constants
  const FAIL = 'FAIL';
  const AVERAGE = 'AVERAGE';
  const PASS = 'PASS';

  const metricState = (score: number): 'FAIL' | 'AVERAGE' | 'PASS' => {
    return score < LIGHTHOUSE_AVERAGE_SCORE_THRESHOLD
      ? FAIL
      : score < LIGHTHOUSE_PASS_SCORE_THRESHOLD
      ? AVERAGE
      : PASS;
  };

  return (
    <MetricsContainer>
      <MetricsHeader>
        <FormattedMessage id="Audits.lighthouse_header" />
      </MetricsHeader>
      <ColumnsContainer>
        {metrics.map((column: LighthouseMetricType[], colNum) => (
          <Column key={colNum}>
            {column.map((metric: LighthouseMetricType) => (
              <Metric key={metric}>
                <MetricInnerwrap state={metricState(auditResult[metric].score)}>
                  <MetricTitle>
                    <FormattedMessage id={`Metrics.${metric}`} />
                  </MetricTitle>
                  <MetricValue state={metricState(auditResult[metric].score)}>
                    {auditResult[metric].displayed_value}
                  </MetricValue>
                </MetricInnerwrap>
              </Metric>
            ))}
          </Column>
        ))}
      </ColumnsContainer>
    </MetricsContainer>
  );
};

export default LighthouseMetrics;
