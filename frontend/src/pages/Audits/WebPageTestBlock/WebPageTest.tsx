import { CircularProgress } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { AuditResultType } from 'redux/auditResults/types';
import { colorUsage } from 'stylesheet';
import Style from './WebPageTest.style';

export interface OwnProps {
  auditResultIds: string[];
}

interface Props extends OwnProps {
  auditResults: AuditResultType[] | null;
}

const WebPageTestBlock: React.FunctionComponent<Props> = props => {
  const { auditResults } = props;

  if (null === auditResults) {
    return (
      <Style.Container>
        <Style.LoaderContainer color={colorUsage.loader}>
          <CircularProgress color={'inherit'} />
        </Style.LoaderContainer>
      </Style.Container>
    );
  }
  const lastAuditResult = auditResults[0];

  return (
    <Style.Container>
      <Style.SubTitle>
        <FormattedMessage id="Audits.webpagetest_detailed_results" />
      </Style.SubTitle>
      <Style.WebPageTestButton href={lastAuditResult.WPTResultsUserUrl} target={'_blank'}>
        <FormattedMessage id="Audits.webpagetest_results" />
      </Style.WebPageTestButton>
    </Style.Container>
  );
};

export default WebPageTestBlock;
