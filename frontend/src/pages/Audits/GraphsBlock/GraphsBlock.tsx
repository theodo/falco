import { CircularProgress } from '@material-ui/core';
import MetricGraph from 'components/MetricGraph';
import * as React from 'react';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';
import { colorUsage } from 'stylesheet';
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

  if (0 === auditResults.length) {
    return (
      <Style.Container>
        <Style.LoaderContainer color={colorUsage.loader}>
          <CircularProgress color={'inherit'} />
        </Style.LoaderContainer>
      </Style.Container>
    );
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
