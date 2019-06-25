import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { AuditResultType, LighthouseMetricType } from 'redux/auditResults/types';
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

  const metricState = (score: number): 'FAIL' | 'AVERAGE' | 'PASS' => {
    return score < 0.5 ? FAIL : score < 0.8 ? AVERAGE : PASS;
  };

  return (
    <MetricsContainer>
      <MetricsHeader>
        <FormattedMessage id="Audits.lighthouse_header" />
      </MetricsHeader>
      <ColumnsContainer>
        {metrics.map((column: LighthouseMetricType[]) => (
          <Column>
            {column.map((metric: LighthouseMetricType) => (
              <Metric>
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
