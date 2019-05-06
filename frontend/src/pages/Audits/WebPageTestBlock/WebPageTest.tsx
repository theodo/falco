import { CircularProgress } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { AuditResultType } from 'redux/auditResults/types';
import { colorUsage, getSpacing } from 'stylesheet';
import Style from './WebPageTest.style';

export interface OwnProps {
  auditResultIds: string[];
  blockMargin: string;
}

interface Props extends OwnProps {
  auditResults: AuditResultType[] | null;
}

const WebPageTestBlock: React.FunctionComponent<Props> = props => {
  const { auditResults, blockMargin } = props;

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
  const lastAuditResult = auditResults[0];

  return (
    <Style.Container margin={blockMargin}>
      <Style.SubTitle margin={`0 0 ${getSpacing(4)} 0`}>
        <FormattedMessage id="Audits.webpagetest_detailed_results" />
      </Style.SubTitle>
      <Style.WebPageTestButton href={lastAuditResult.WPTResultsUserUrl} target={'_blank'}>
        <FormattedMessage id="Audits.webpagetest_results" />
      </Style.WebPageTestButton>
    </Style.Container>
  );
};

export default WebPageTestBlock;
