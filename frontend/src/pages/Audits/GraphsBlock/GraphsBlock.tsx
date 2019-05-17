import * as React from 'react';

import ErrorMessage from 'components/ErrorMessage';
import Loader from 'components/Loader';
import MetricGraph from 'components/MetricGraph';
import { FormattedMessage } from 'react-intl';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';
import { getSpacing } from 'stylesheet';
import Style from './GraphsBlock.style';
import MetricModal from './MetricModal';

export interface OwnProps {
  auditResultIds: string[] | null;
  blockMargin: string;
}

interface Props extends OwnProps {
  auditResults: AuditResultsAsGraphData;
  metrics: MetricType[];
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

  const [showModal, toggleModal] = React.useState(false);
  const openModal = () => {
    toggleModal(true);
  };
  const closeModal = () => {
    toggleModal(false);
  };

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
        <Style.ChooseMetricsButton margin={`0 0 ${getSpacing(4)} 0`} onClick={openModal}>
          <FormattedMessage id="Audits.MetricsModal.add_delete_metrics" /> →
        </Style.ChooseMetricsButton>
        <Style.GraphInfoLink
          href="https://twitter.com/Phacks/status/1110161414025555968"
          target="_blank"
          margin={`0 0 0 ${getSpacing(8)}`}
        >
          <FormattedMessage id="Audits.pick_right_metrics" />
        </Style.GraphInfoLink>
      </Style.GraphSettingsContainer>
      <MetricModal metrics={metrics} show={showModal} close={closeModal} />
    </Style.Container>
  );
};
