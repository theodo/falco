import { CircularProgress } from '@material-ui/core';
import MetricGraph from 'components/MetricGraph';
import * as React from 'react';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';
import { colorUsage, getSpacing } from 'stylesheet';
import Style from './GraphsBlock.style';

export interface OwnProps {
  auditResultIds: string[];
  metrics: MetricType[];
  blockMargin: string;
}

interface Props extends OwnProps {
  auditResults: AuditResultsAsGraphData;
}

const GraphsBlock: React.FunctionComponent<Props> = props => {
  const { auditResults, metrics, blockMargin } = props;

  if (0 === auditResults.length) {
    return (
      <Style.Container margin={blockMargin}>
        <Style.LoaderContainer color={colorUsage.loader}>
          <CircularProgress color={'inherit'} />
        </Style.LoaderContainer>
      </Style.Container>
    );
  }

  return (
    <Style.Container margin={blockMargin}>
      {metrics.map((metric, index) => {
        return (
          <Style.GraphContainer margin={`0 0 ${getSpacing(4)} 0`} key={index}>
            <MetricGraph auditResults={auditResults} metrics={[metric]} />
          </Style.GraphContainer>
        );
      })}
    </Style.Container>
  );
};

export default GraphsBlock;
