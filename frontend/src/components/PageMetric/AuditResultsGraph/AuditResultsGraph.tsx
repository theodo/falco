import dayjs from 'dayjs';
import * as React from 'react';
import { METRICS } from 'redux/auditResults/constants';
import { MetricType } from 'redux/auditResults/types';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import Style from './AuditResultsGraph.style';

export interface OwnProps {
  auditResultIds: string[];
  metric: MetricType;
}

interface DataType {
  x: Date;
  y: number;
}

type Props = {
  auditResults?: DataType[];
} & OwnProps;

const AuditResultsGraph: React.FunctionComponent<Props> = props => {
  const { auditResults, metric } = props;
  if (!auditResults || auditResults.length === 0) {
    return <div>Loading...</div>;
  }
  const maxValue = Math.max(...auditResults.map(result => result.y));
  const maxDomain = maxValue + 0.2 * maxValue;

  return (
    <Style.Container>
      <VictoryChart theme={VictoryTheme.material} domain={{ y: [0, maxDomain] }}>
        <VictoryLine data={auditResults} />
        <VictoryAxis dependentAxis />
        <VictoryAxis tickFormat={tick => dayjs(tick).format('DD/MM')} scale={{ x: 'time' }} />
      </VictoryChart>
    </Style.Container>
  );
};

export default AuditResultsGraph;
