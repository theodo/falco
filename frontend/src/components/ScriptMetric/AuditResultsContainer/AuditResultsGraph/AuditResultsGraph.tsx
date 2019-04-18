import MetricGraph from 'components/MetricGraph';
import * as React from 'react';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';
import Style from './AuditResultsGraph.style';

export interface OwnProps {
  auditResultIds: string[];
  metrics: MetricType[];
}

interface Props extends OwnProps {
  auditResults: AuditResultsAsGraphData;
}

const AuditResultsGraph: React.FunctionComponent<Props> = props => {
  const { auditResults, metrics } = props;

  if (auditResults.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Style.Container>
      <h3 style={{ marginBottom: 0 }}>{auditResults[0].scriptStepName}</h3>
      <MetricGraph auditResults={auditResults} metrics={metrics} />
    </Style.Container>
  );
};

export default AuditResultsGraph;
