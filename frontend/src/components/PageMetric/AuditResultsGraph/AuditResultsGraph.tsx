import * as React from 'react';
import Style from './AuditResultsGraph.style';
import dayjs from 'dayjs';
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';
import { MetricType } from 'redux/auditResults/types';

export type OwnProps = {
  auditResultIds: string[];
  metric: MetricType;
};

type DataType = {
  x: Date;
  y: number;
};

type Props = {
  auditResults?: DataType[];
} & OwnProps;

const AuditResultsGraph: React.FunctionComponent<Props> = props => {
  const { auditResults } = props;
  if (!auditResults || auditResults.length === 0) return <div>Loading...</div>;

  return (
    <Style.Container>
      <VictoryChart height={250} padding={{ top: 10, bottom: 20, left: 40, right: 20 }}>
        <VictoryLine
          style={{
            data: { stroke: '#c43a31' },
          }}
          data={auditResults}
        />
        <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: '10px' } }} />
        <VictoryAxis
          tickFormat={tick => dayjs(tick).format('DD/MM')}
          scale={{ x: 'time' }}
          style={{ tickLabels: { fontSize: '10px' } }}
        />
      </VictoryChart>
    </Style.Container>
  );
};

export default AuditResultsGraph;
