import ErrorMessage from 'components/ErrorMessage';
import * as React from 'react';

import Loader from 'components/Loader';
import MetricGraph from 'components/MetricGraph';
import { FormattedMessage } from 'react-intl';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';
import { getSpacing } from 'stylesheet';
import Style from './GraphsBlock.style';

export interface OwnProps {
  auditResultIds: string[] | null;
  metrics: MetricType[];
  blockMargin: string;
}

interface Props extends OwnProps {
  auditResults: AuditResultsAsGraphData;
}

export const GraphsBlock: React.FunctionComponent<Props> = props => {
  const { auditResults, auditResultIds, metrics, blockMargin } = props;

  if (!auditResultIds || !auditResults) {
    return (
      <Style.Container margin={blockMargin}>
        <Loader />
      </Style.Container>
    );
  }

  if (0 === auditResultIds.length || 0 === auditResults.length) {
    return (
      <Style.Container margin={blockMargin}>
        <ErrorMessage>
          <FormattedMessage id="Audits.no_audit" />
        </ErrorMessage>
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
      <Style.GraphSettingsContainer>
        <Style.GraphInfoLink
          href="https://twitter.com/Phacks/status/1110161414025555968"
          target="_blank"
          margin={`0 0 0 ${getSpacing(8)}`}
        >
          <FormattedMessage id="Audits.pick_right_metrics" />
        </Style.GraphInfoLink>
      </Style.GraphSettingsContainer>
    </Style.Container>
  );
};
