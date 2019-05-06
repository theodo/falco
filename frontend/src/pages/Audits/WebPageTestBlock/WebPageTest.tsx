import { CircularProgress } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
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
  const getAuditUrl = (auditResult: AuditResultType) => auditResult.WPTResultsUserUrl;
  const [webPageTestUrl, setWebPageTestUrl] = useState(getAuditUrl(lastAuditResult));

  const handleRadioButtonChange = (e: ChangeEvent): void => {
    switch ((e.target as HTMLInputElement).value) {
      case 'latest':
        setWebPageTestUrl(getAuditUrl(auditResults[0]));
        break;
      case 'oldest':
        setWebPageTestUrl(getAuditUrl(auditResults.slice(-1)[0]));
        break;
    }
  };

  return (
    <Style.Container margin={blockMargin}>
      <Style.SubTitle margin={`0 0 ${getSpacing(4)} 0`}>
        <FormattedMessage id="Audits.webpagetest_detailed_results" />
      </Style.SubTitle>
      <Style.Form>
        <Style.FormLabel>
          <FormattedMessage id="Audits.webpagetest_choose_results" />
        </Style.FormLabel>
        <Style.FormInputs>
          <Style.OptionContainer margin={`0 0 ${getSpacing(4)} 0`}>
            <Style.RadioButton
              type="radio"
              value={'latest'}
              name="audit"
              onChange={handleRadioButtonChange}
              defaultChecked
            />
            <Style.RadioButtonLabel margin={`0 ${getSpacing(2)} 0 0`} />
            <FormattedMessage id="Audits.webpagetest_latest_audit" />
          </Style.OptionContainer>
          <Style.OptionContainer>
            <Style.RadioButton
              type="radio"
              value={'oldest'}
              name="audit"
              onChange={handleRadioButtonChange}
            />
            <Style.RadioButtonLabel margin={`0 ${getSpacing(2)} 0 0`} />
            Autre bouton
          </Style.OptionContainer>
        </Style.FormInputs>
      </Style.Form>
      <Style.WebPageTestLink href={webPageTestUrl} target={'_blank'}>
        <FormattedMessage id="Audits.webpagetest_results" />
      </Style.WebPageTestLink>
    </Style.Container>
  );
};

export default WebPageTestBlock;
