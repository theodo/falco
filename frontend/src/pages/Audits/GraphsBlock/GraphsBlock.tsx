import dayjs from 'dayjs';
import * as React from 'react';

import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import MetricGraph from 'components/MetricGraph';
import { FormattedMessage } from 'react-intl';
import { METRICS } from 'redux/auditResults/constants';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';
import { getSpacing } from 'stylesheet';
import GraphModal from './GraphModal';
import {
  ChooseMetricsButton,
  Container,
  GraphContainer,
  GraphInfoLink,
  GraphSettingsContainer,
} from './GraphsBlock.style';
import MetricModal from './MetricModal';

export interface OwnProps {
  auditResultIds: string[] | null;
  blockMargin: string;
}

interface Props extends OwnProps {
  auditResults: AuditResultsAsGraphData;
  metrics: MetricType[];
  auditParametersId: string;
  pageOrScriptId: string;
  auditType: 'page' | 'script';
  fetchAuditResultsRequest: (
    auditParametersId: string,
    pageOrScriptId: string,
    type: 'page' | 'script',
    fromDate?: dayjs.Dayjs,
    toDate?: dayjs.Dayjs,
  ) => void;
}

export const GraphsBlock: React.FunctionComponent<Props> = ({
  auditResults,
  auditResultIds,
  metrics,
  blockMargin,
  auditParametersId,
  pageOrScriptId,
  auditType,
  fetchAuditResultsRequest,
}) => {
  const [showMetricModal, toggleMetricModal] = React.useState(false);
  const [showGraphModal, toggleGraphModal] = React.useState(false);
  const [fullScreenedMetric, setFullScreenedMetric] = React.useState('' as MetricType);
  const [hasRequestedFullData, setHasRequestedFullData] = React.useState(false);

  React.useEffect(() => {
    setHasRequestedFullData(false);
  }, [pageOrScriptId]);

  const fetchFullDataRequest = () => {
    if (!hasRequestedFullData) {
      fetchAuditResultsRequest(auditParametersId, pageOrScriptId, auditType);
      setHasRequestedFullData(true);
    }
  };

  const openMetricModal = () => {
    toggleMetricModal(true);
  };
  const closeMetricModal = () => {
    toggleMetricModal(false);
  };

  const openGraphModal = (metric: MetricType) => () => {
    fetchFullDataRequest();
    setFullScreenedMetric(metric);
    toggleGraphModal(true);
  };
  const closeGraphModal = () => {
    toggleGraphModal(false);
  };

  if (!auditResultIds || !auditResults) {
    return (
      <Container margin={blockMargin}>
        <Loader />
      </Container>
    );
  }

  if (0 === auditResultIds.length || 0 === auditResults.length) {
    return (
      <Container margin={blockMargin}>
        <MessagePill messageType="error">
          <FormattedMessage id="Audits.no_audit" />
        </MessagePill>
      </Container>
    );
  }

  return (
    <Container margin={blockMargin}>
      {(Object.keys(METRICS) as MetricType[])
        .filter((metric) => metrics.indexOf(metric) > -1)
        .map((metric, index) => {
          return (
            <GraphContainer margin={`0 0 ${getSpacing(4)} 0`} key={index}>
              <MetricGraph
                fullscreen={false}
                auditResults={auditResults}
                metrics={[metric]}
                onExpandClick={openGraphModal}
                showOnlyLastWeek={true}
              />
            </GraphContainer>
          );
        })}
      <GraphSettingsContainer>
        <ChooseMetricsButton margin={`0 0 ${getSpacing(4)} 0`} onClick={openMetricModal}>
          <FormattedMessage id="Audits.MetricsModal.add_delete_metrics" /> →
        </ChooseMetricsButton>
        <GraphInfoLink
          href="https://twitter.com/Phacks/status/1110161414025555968"
          target="_blank"
          margin={`0 0 0 ${getSpacing(8)}`}
        >
          <FormattedMessage id="Audits.pick_right_metrics" />
        </GraphInfoLink>
      </GraphSettingsContainer>
      <MetricModal metrics={metrics} show={showMetricModal} close={closeMetricModal} />
      <GraphModal
        metric={fullScreenedMetric}
        auditResults={auditResults}
        show={showGraphModal}
        close={closeGraphModal}
      />
    </Container>
  );
};
