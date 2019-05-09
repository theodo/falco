import * as React from 'react';

import Loader from 'components/Loader';
import MetricGraph from 'components/MetricGraph';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';
import { getSpacing } from 'stylesheet';
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
        <Loader />
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
