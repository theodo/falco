import * as React from 'react';

import ErrorMessage from 'components/ErrorMessage';
import Loader from 'components/Loader';
import MetricGraph from 'components/MetricGraph';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { METRICS } from 'redux/auditResults/constants';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';
import { getSpacing } from 'stylesheet';
import GraphModal from './GraphModal';
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

export const GraphsBlock: React.FunctionComponent<Props & InjectedIntlProps> = ({
  auditResults,
  auditResultIds,
  metrics,
  blockMargin,
}) => {
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

  const [showMetricModal, toggleMetricModal] = React.useState(false);
  const openMetricModal = () => {
    toggleMetricModal(true);
  };
  const closeMetricModal = () => {
    toggleMetricModal(false);
  };

  const [showGraphModal, toggleGraphModal] = React.useState(false);
  const [fullScreenedMetric, setFullScreenedMetric] = React.useState('' as MetricType);
  const openGraphModal = (metric: MetricType) => () => {
    setFullScreenedMetric(metric);
    toggleGraphModal(true);
  };
  const closeGraphModal = () => {
    toggleGraphModal(false);
  };

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
      {(Object.keys(METRICS) as MetricType[])
        .filter(metric => metrics.indexOf(metric) > -1)
        .map((metric, index) => {
          return (
            <Style.GraphContainer margin={`0 0 ${getSpacing(4)} 0`} key={index}>
              <MetricGraph
                fullscreen={false}
                auditResults={auditResults}
                metrics={[metric]}
                onExpandClick={openGraphModal}
                showOnlyLastWeek={true}
              />
            </Style.GraphContainer>
          );
        })}
      <Style.GraphSettingsContainer>
        <Style.ChooseMetricsButton margin={`0 0 ${getSpacing(4)} 0`} onClick={openMetricModal}>
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
      <MetricModal metrics={metrics} show={showMetricModal} close={closeMetricModal} />
      <GraphModal
        metric={fullScreenedMetric}
        auditResults={auditResults}
        show={showGraphModal}
        close={closeGraphModal}
      />
    </Style.Container>
  );
};
