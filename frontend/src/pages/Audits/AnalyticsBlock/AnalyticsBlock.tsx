import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';

import { AuditResultType } from 'redux/auditResults/types';
import { colorUsage, getSpacing } from 'stylesheet';
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
        <Style.LoaderContainer color={colorUsage.loader}>
          <CircularProgress color={'inherit'} />
        </Style.LoaderContainer>
      </Style.Container>
    );
  }

  if (0 === auditResults.length) {
    return (
      <Style.Container margin={blockMargin}>
        <Style.Error>
          <FormattedMessage id="Audits.no_audit" />
        </Style.Error>
      </Style.Container>
    );
  }

  const getAuditId = (audit: AuditResultType) => {
    const auditUrl = new URL(audit.WPTResultsJsonUrl);
    return auditUrl.searchParams.get('test');
  };

  const getLighthouseUrl = () => {
    const baseUrl = 'https://www.webpagetest.org/lighthouse.php?test=';
    const auditId = getAuditId(auditResults[0]);
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
