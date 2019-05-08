import { CircularProgress } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { ValueType } from 'react-select/lib/types';

import Select from 'components/Select';
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

  const [selectedAudit, setSelectedAudit] = useState(auditResults[0]);
  const [auditToCompare, setAuditToCompare] = useState(auditResults[1]);
  const [dateSelectorDisplayed, displayDateSelector] = useState(false);
  const [dateComparatorDisplayed, displayDateComparator] = useState(false);

  const getWebPageTestUrl = () => {
    if (!dateComparatorDisplayed) {
      return selectedAudit.WPTResultsUserUrl;
    }
    const baseUrl = 'https://www.webpagetest.org/video/compare.php?tests=';
    const selectedAuditUrl = new URL(selectedAudit.WPTResultsJsonUrl);
    const selectedAuditId = selectedAuditUrl.searchParams.get('test');
    const auditToCompareUrl = new URL(auditToCompare.WPTResultsJsonUrl);
    const auditToCompareId = auditToCompareUrl.searchParams.get('test');

    return `${baseUrl}${selectedAuditId},${auditToCompareId}`;
  };

  const handleRadioButtonChange = (e: ChangeEvent): void => {
    switch ((e.target as HTMLInputElement).value) {
      case 'latest':
        displayDateSelector(false);
        displayDateComparator(false);
        break;
      case 'dateSelector':
        setSelectedAudit(auditResults[0]);
        displayDateSelector(true);
        displayDateComparator(false);
        break;
      case 'dateComparator':
        setSelectedAudit(auditResults[0]);
        setAuditToCompare(auditResults[1]);
        displayDateSelector(false);
        displayDateComparator(true);
        break;
    }
  };

  interface AuditResultOption {
    value: string;
    label: string;
  }

  const auditResultsSelectOptions = (origin: 'FROM_SELECTED' | 'FROM_TO_COMPARE') =>
    auditResults.map(auditResult => ({
      label: auditResult.createdAt.format(
        intl.formatMessage({ id: 'Audits.webpagetest_date_format' }),
      ),
      value: auditResult.auditId,
      isDisabled:
        origin === 'FROM_TO_COMPARE'
          ? auditResult.auditId === selectedAudit.auditId
          : dateComparatorDisplayed && auditResult.auditId === auditToCompare.auditId,
    }));

  const handleSelectDateChange = (origin: 'FROM_SELECTED' | 'FROM_TO_COMPARE') => (
    auditResultOption: ValueType<AuditResultOption | {}>,
  ) => {
    if (auditResultOption && 'value' in auditResultOption) {
      const correspondingAudit = auditResults.find(
        auditResult => auditResult.auditId === auditResultOption.value,
      );
      if (correspondingAudit) {
        origin === 'FROM_TO_COMPARE'
          ? setAuditToCompare(correspondingAudit)
          : setSelectedAudit(correspondingAudit);
      }
    }
  };

  const options: any = ['latest', 'dateSelector', 'dateComparator'].reduce(
    (cummulatedOptions, optionType) => {
      return {
        ...cummulatedOptions,
        [optionType]: {
          value: optionType,
          label: `Audits.webpagetest_${optionType}_audit`,
        },
      };
    },
    {},
  );

  const optionBlock = (optionType: 'latest' | 'dateSelector' | 'dateComparator') => {
    return (
      <Style.OptionContainer margin={`0 0 ${getSpacing(4)} 0`}>
        <Style.RadioButton
          defaultChecked={optionType === 'latest'}
          type="radio"
          value={options[optionType].value}
          name="audit"
          onChange={handleRadioButtonChange}
        />
        <Style.RadioButtonLabel margin={`0 ${getSpacing(2)} 0 0`} />
        <FormattedMessage id={options[optionType].label} />
      </Style.OptionContainer>
    );
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
          {optionBlock('latest')}
          {optionBlock('dateSelector')}
          {optionBlock('dateComparator')}
        </Style.FormInputs>
      </Style.Form>
      {(dateSelectorDisplayed || dateComparatorDisplayed) && (
        <Style.Form>
          <Style.FormLabel>
            {dateComparatorDisplayed ? (
              <FormattedMessage id="Audits.webpagetest_select_dates" />
            ) : (
              <FormattedMessage id="Audits.webpagetest_select_date" />
            )}
          </Style.FormLabel>
          <Style.FormInputs>
            <Style.DateSelectorContainer>
              <Style.DateTitle margin={`0 0 ${getSpacing(2)} 0`}>
                {dateComparatorDisplayed ? (
                  'Date 1'
                ) : (
                  <FormattedMessage id="Audits.webpagetest_date_label" />
                )}
              </Style.DateTitle>
              <Select
                value={auditResultsSelectOptions('FROM_SELECTED').find(
                  auditResultSelectOption =>
                    selectedAudit.auditId === auditResultSelectOption.value,
                )}
                onChange={handleSelectDateChange('FROM_SELECTED')}
                options={auditResultsSelectOptions('FROM_SELECTED')}
              />
            </Style.DateSelectorContainer>
            {dateComparatorDisplayed && (
              <Style.DateSelectorContainer>
                <Style.DateTitle margin={`0 0 ${getSpacing(2)} 0`}>Date 2</Style.DateTitle>
                <Select
                  value={auditResultsSelectOptions('FROM_TO_COMPARE').find(
                    auditResultSelectOption =>
                      auditToCompare.auditId === auditResultSelectOption.value,
                  )}
                  onChange={handleSelectDateChange('FROM_TO_COMPARE')}
                  options={auditResultsSelectOptions('FROM_TO_COMPARE')}
                />
              </Style.DateSelectorContainer>
            )}
          </Style.FormInputs>
        </Style.Form>
      )}
      <Style.WebPageTestLink href={getWebPageTestUrl()} target={'_blank'}>
        <FormattedMessage id="Audits.webpagetest_results" />
      </Style.WebPageTestLink>
    </Style.Container>
  );
};

export default WebPageTestBlock;
