import MetricGraph from 'components/MetricGraph';
import * as React from 'react';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';
import Style from './GraphsBlock.style';

export interface OwnProps {
  auditResultIds: string[];
  metrics: MetricType[];
}

interface Props extends OwnProps {
  auditResults: AuditResultsAsGraphData;
}

const GraphsBlock: React.FunctionComponent<Props> = props => {
  const { auditResults, metrics } = props;

  if (auditResults.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Style.Container>
      {metrics.map((metric, index) => {
        return (
          <Style.GraphContainer key={index} index={index}>
            <MetricGraph auditResults={auditResults} metrics={[metric]} />
          </Style.GraphContainer>
        );
      })}
    </Style.Container>
  );
};

export default GraphsBlock;
