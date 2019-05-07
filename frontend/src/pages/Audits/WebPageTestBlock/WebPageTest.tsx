import { CircularProgress } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { ValueType } from 'react-select/lib/types';

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

const WebPageTestBlock: React.FunctionComponent<Props & InjectedIntlProps> = props => {
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

  const getAuditUrl = (auditResult: AuditResultType) => auditResult.WPTResultsUserUrl;
  const [selectedAudit, setSelectedAudit] = useState(auditResults[0]);
  const [dateSelector, setDateSelector] = useState(false);
  const handleRadioButtonChange = (e: ChangeEvent): void => {
    switch ((e.target as HTMLInputElement).value) {
      case 'latest':
        setDateSelector(false);
        setSelectedAudit(auditResults[0]);
        break;
      case 'specified':
        setDateSelector(true);
        setSelectedAudit(auditResults.slice(-1)[0]);
        break;
    }
  };

  interface AuditResultOption {
    value: string;
    label: string;
  }

  const auditResultsSelectOptions = auditResults.map(auditResult => ({
    label: auditResult.createdAt.format(
      intl.formatMessage({ id: 'Audits.webpagetest_date_format' }),
    ),
    value: auditResult.auditId,
  }));

  const handleSelectDateChange = (auditResultOption: ValueType<AuditResultOption | {}>) => {
    if (auditResultOption && 'value' in auditResultOption) {
      const correspondingAudit = auditResults.find(
        auditResult => auditResult.auditId === auditResultOption.value,
      );
      if (correspondingAudit) {
        setSelectedAudit(correspondingAudit);
      }
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
              value={'specified'}
              name="audit"
              onChange={handleRadioButtonChange}
            />
            <Style.RadioButtonLabel margin={`0 ${getSpacing(2)} 0 0`} />
            <FormattedMessage id="Audits.webpagetest_specify_date" />
          </Style.OptionContainer>
        </Style.FormInputs>
      </Style.Form>
      {dateSelector && (
        <Style.Form>
          <Style.FormLabel>
            <FormattedMessage id="Audits.webpagetest_select_date" />
          </Style.FormLabel>
          <Style.FormInputs>
            <Style.DateSelectorContainer>
              <Style.DateTitle margin={`0 0 ${getSpacing(2)} 0`}>Date 1</Style.DateTitle>
              <Style.DateSelector
                isSearchable
                value={auditResultsSelectOptions.find(
                  auditResultSelectOption =>
                    selectedAudit.auditId === auditResultSelectOption.value,
                )}
                onChange={handleSelectDateChange}
                options={auditResultsSelectOptions}
              />
            </Style.DateSelectorContainer>
          </Style.FormInputs>
        </Style.Form>
      )}
      <Style.WebPageTestLink href={getAuditUrl(selectedAudit)} target={'_blank'}>
        <FormattedMessage id="Audits.webpagetest_results" />
      </Style.WebPageTestLink>
    </Style.Container>
  );
};

export default WebPageTestBlock;
