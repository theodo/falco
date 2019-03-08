import dayjs from 'dayjs';
import * as React from 'react';
import { METRICS } from 'redux/auditResults/constants';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import Style from './AuditResultsGraph.style';

export interface OwnProps {
  auditResultIds: string[];
  metrics: MetricType[];
}

interface Props extends OwnProps {
  auditResults: AuditResultsAsGraphData;
};

const AuditResultsGraph: React.FunctionComponent<Props> = props => {
  const { auditResults } = props;

  if (auditResults.length === 0) {
    return <div>Loading...</div>;
  }

  const maxValueOfAllAuditsForAllMetrics = Math.max(...auditResults.map(resultsPerMetric =>
    Math.max(...resultsPerMetric.auditResults.map(result => result.y))
  ));

  const maxDomain = maxValueOfAllAuditsForAllMetrics + 0.2 * maxValueOfAllAuditsForAllMetrics;

  return (
    <Style.Container>
      <VictoryChart theme={VictoryTheme.material} domain={{ y: [0, maxDomain] }}>
        {auditResults.map(auditResultsPerMetric =>
          <VictoryLine
            style={{ data: { stroke: METRICS[auditResultsPerMetric.metric].colorDark, strokeWidth: 2 } }}
            data={auditResultsPerMetric.auditResults}
            key={`metric.graph.${auditResultsPerMetric.metric}`}
          />
        )}
        <VictoryAxis dependentAxis />
        <VictoryAxis tickFormat={tick => dayjs(tick).format('DD/MM')} scale={{ x: 'time' }} />
      </VictoryChart>
    </Style.Container>
  );
};

export default AuditResultsGraph;
