import React from 'react';
import { FormattedMessage } from 'react-intl';

import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import { AuditResultType } from 'redux/auditResults/types';
import { getWPTAuditId } from 'services/utils';
import { getSpacing } from 'stylesheet';
import { Container } from './AnalyticsBlock.style';
import LighthouseBlock from './LighthouseBlock';
import WebPageTestBlock from './WebPageTestBlock';

export interface OwnProps {
  auditResultIds: string[] | null;
  blockMargin: string;
}

interface Props extends OwnProps {
  auditResults: AuditResultType[] | null;
}

export const AnalyticsBlock: React.FunctionComponent<Props> = props => {
  const { auditResults, auditResultIds, blockMargin } = props;

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

  const getLighthouseUrl = () => {
    const baseUrl = 'https://www.webpagetest.org/lighthouse.php?test=';
    const auditId = getWPTAuditId(auditResults[0]);
    return `${baseUrl}${auditId}`;
  };

  return (
    <Container margin={blockMargin}>
      <WebPageTestBlock blockMargin={`0 0 ${getSpacing(4)} 0`} auditResults={auditResults} />
      {auditResults[0].WPTMetricLighthousePerformance ? (
        <LighthouseBlock lighthouseUrl={getLighthouseUrl()} lastAuditResult={auditResults[0]} />
      ) : null}
    </Container>
  );
};
