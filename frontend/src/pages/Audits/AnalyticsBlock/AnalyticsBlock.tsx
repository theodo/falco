import React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';

import ErrorMessage from 'components/ErrorMessage';
import Loader from 'components/Loader';
import { AuditResultType } from 'redux/auditResults/types';
import { getWPTAuditId } from 'services/utils';
import { getSpacing } from 'stylesheet';
import Style from './AnalyticsBlock.style';
import LighthouseBlock from './LighthouseBlock';
import WebPageTestBlock from './WebPageTestBlock';

export interface OwnProps {
  auditResultIds: string[];
  blockMargin: string;
}

interface Props extends OwnProps {
  auditResults: AuditResultType[] | null;
}

const AnalyticsBlock: React.FunctionComponent<Props & InjectedIntlProps> = props => {
  const { auditResults, blockMargin, intl } = props;

  if (null === auditResults) {
    return (
      <Style.Container margin={blockMargin}>
        <Loader />
      </Style.Container>
    );
  }

  if (0 === auditResults.length) {
    return (
      <Style.Container margin={blockMargin}>
        <ErrorMessage>
          <FormattedMessage id="Audits.no_audit" />
        </ErrorMessage>
      </Style.Container>
    );
  }

  const getLighthouseUrl = () => {
    const baseUrl = 'https://www.webpagetest.org/lighthouse.php?test=';
    const auditId = getWPTAuditId(auditResults[0]);
    return `${baseUrl}${auditId}`;
  };

  return (
    <Style.Container margin={blockMargin}>
      <WebPageTestBlock blockMargin={`0 0 ${getSpacing(4)} 0`} auditResults={auditResults} />
      <LighthouseBlock lighthouseUrl={getLighthouseUrl()} />
    </Style.Container>
  );
};

export default AnalyticsBlock;
