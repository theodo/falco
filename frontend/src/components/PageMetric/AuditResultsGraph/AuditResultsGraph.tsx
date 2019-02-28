import * as React from 'react';
import Style from './AuditResultsGraph.style';
import dayjs from 'dayjs';
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';

export type OwnProps = {
  auditResultIds: string[];
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

  const maxTime = Math.max(...auditResults.map(auditResults => auditResults.y));
  const minTime = Math.min(...auditResults.map(auditResults => auditResults.y));

  return (
    <Style.Container>
      <VictoryChart height={250} padding={{ top: 10, bottom: 20, left: 40, right: 20 }}>
        <VictoryLine
          style={{
            data: { stroke: '#c43a31' },
          }}
          data={auditResults}
        />
        <VictoryAxis
          dependentAxis
          style={{ tickLabels: { fontSize: '10px' } }}
          domain={[minTime - 200, maxTime + 200]}
        />
        <VictoryAxis
          tickValues={auditResults.map(auditResults => auditResults.x)}
          tickFormat={tick => dayjs(tick).format('DD/MM')}
          scale={{ x: 'time' }}
          style={{ tickLabels: { fontSize: '10px' } }}
        />
      </VictoryChart>
    </Style.Container>
  );
};

export default AuditResultsGraph;
