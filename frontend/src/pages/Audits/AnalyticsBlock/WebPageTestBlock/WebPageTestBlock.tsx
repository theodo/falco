import Select from 'components/Select';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ValueType } from 'react-select/lib/types';
import { AuditResultType } from 'redux/auditResults/types';

import { getWPTAuditId } from 'services/utils';
import { getSpacing } from 'stylesheet';
import {
  Container,
  DateSelectorContainer,
  DateTitle,
  Form,
  FormInputs,
  FormLabel,
  OptionContainer,
  RadioButton,
  RadioButtonLabel,
  RadioButtonText,
  SubTitle,
  WebPageTestLink,
} from './WebPageTestBlock.style';

export interface OwnProps {
  auditResults: AuditResultType[];
  blockMargin: string;
}

const WebPageTestBlock: React.FunctionComponent<OwnProps> = (props) => {
  const { auditResults, blockMargin } = props;
  const intl = useIntl();

  const [selectedAudit, setSelectedAudit] = React.useState(auditResults[0]);
  React.useEffect(() => setSelectedAudit(auditResults[0]), [auditResults]);

  const [auditToCompare, setAuditToCompare] = React.useState(auditResults[1]);
  const [dateSelectorDisplayed, displayDateSelector] = React.useState(false);
  const [dateComparatorDisplayed, displayDateComparator] = React.useState(false);

  const [selectedOption, setSelectedOption] = React.useState('latest');

  const getWebPageTestUrl = () => {
    if (!dateComparatorDisplayed) {
      return selectedAudit.WPTResultsUserUrl;
    }
    const privateInstanceRootUrl = selectedAudit.WPTResultsUserUrl.split('/result/')[0];
    const baseUrl = `${privateInstanceRootUrl}/video/compare.php?tests=`;
    const selectedAuditId = getWPTAuditId(selectedAudit);
    const auditToCompareId = getWPTAuditId(auditToCompare);

    return `${baseUrl}${selectedAuditId},${auditToCompareId}`;
  };

  const handleRadioButtonChange = (
    e: React.MouseEvent,
    radioOptionType: 'latest' | 'dateSelector' | 'dateComparator',
  ): void => {
    setSelectedOption(radioOptionType);
    switch (radioOptionType) {
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

  const isOptionSelected = (radioOptionType: 'latest' | 'dateSelector' | 'dateComparator') => {
    return radioOptionType === selectedOption;
  };

  interface AuditResultOption {
    value: string;
    label: string;
  }

  dayjs.extend(LocalizedFormat).locale(intl.locale);

  const auditResultsSelectOptions = (origin: 'FROM_SELECTED' | 'FROM_TO_COMPARE') =>
    auditResults.map((auditResult) => ({
      label: intl.formatMessage(
        { id: 'Audits.webpagetest_date_format' },
        {
          day: dayjs(auditResult.createdAt).format('L'),
          time: dayjs(auditResult.createdAt).format('LT'),
        },
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
        (auditResult) => auditResult.auditId === auditResultOption.value,
      );
      if (correspondingAudit) {
        origin === 'FROM_TO_COMPARE'
          ? setAuditToCompare(correspondingAudit)
          : setSelectedAudit(correspondingAudit);
      }
    }
  };

  const radioOptions: { [key: string]: { value: string; label: string } } = [
    'latest',
    'dateSelector',
    'dateComparator',
  ].reduce((cummulatedOptions, radioOptionType) => {
    return {
      ...cummulatedOptions,
      [radioOptionType]: {
        value: radioOptionType,
        label: `Audits.webpagetest_${radioOptionType}_audit`,
      },
    };
  }, {});

  const optionBlock = (radioOptionType: 'latest' | 'dateSelector' | 'dateComparator') => {
    return (
      <OptionContainer margin={`0 0 ${getSpacing(4)} 0`}>
        <RadioButton
          checked={isOptionSelected(radioOptionType)}
          type="radio"
          value={radioOptions[radioOptionType].value}
          name="audit"
          onClick={(e) => handleRadioButtonChange(e, radioOptionType)}
          style={{ cursor: 'pointer' }}
          readOnly={true}
        />
        <RadioButtonLabel margin={`0 ${getSpacing(2)} 0 0`} />
        <RadioButtonText onClick={(e) => handleRadioButtonChange(e, radioOptionType)}>
          <FormattedMessage id={radioOptions[radioOptionType].label} />
        </RadioButtonText>
      </OptionContainer>
    );
  };

  return (
    <Container margin={blockMargin}>
      <SubTitle margin={`0 0 ${getSpacing(4)} 0`} data-testid="title">
        <FormattedMessage id="Audits.webpagetest_detailed_results" />
      </SubTitle>
      <Form>
        <FormLabel data-testid="subtitle">
          <FormattedMessage id="Audits.webpagetest_choose_results" />
        </FormLabel>
        <FormInputs>
          {optionBlock('latest')}
          {optionBlock('dateSelector')}
          {auditResults.length > 1 && optionBlock('dateComparator')}
        </FormInputs>
      </Form>
      {(dateSelectorDisplayed || dateComparatorDisplayed) && (
        <Form data-testid="select-dates-form">
          <FormLabel>
            {dateComparatorDisplayed ? (
              <FormattedMessage id="Audits.webpagetest_select_dates" />
            ) : (
              <FormattedMessage id="Audits.webpagetest_select_date" />
            )}
          </FormLabel>
          <FormInputs>
            <DateSelectorContainer margin={`0 0 ${getSpacing(2)} 0`}>
              <DateTitle margin={`0 0 ${getSpacing(2)} 0`}>
                {dateComparatorDisplayed ? (
                  'Date 1'
                ) : (
                  <FormattedMessage id="Audits.webpagetest_date_label" />
                )}
              </DateTitle>
              <Select
                value={auditResultsSelectOptions('FROM_SELECTED').find(
                  (auditResultSelectOption) =>
                    selectedAudit.auditId === auditResultSelectOption.value,
                )}
                onChange={handleSelectDateChange('FROM_SELECTED')}
                options={auditResultsSelectOptions('FROM_SELECTED')}
              />
            </DateSelectorContainer>
            {dateComparatorDisplayed && (
              <DateSelectorContainer>
                <DateTitle margin={`0 0 ${getSpacing(2)} 0`}>Date 2</DateTitle>
                <Select
                  value={auditResultsSelectOptions('FROM_TO_COMPARE').find(
                    (auditResultSelectOption) =>
                      auditToCompare.auditId === auditResultSelectOption.value,
                  )}
                  onChange={handleSelectDateChange('FROM_TO_COMPARE')}
                  options={auditResultsSelectOptions('FROM_TO_COMPARE')}
                />
              </DateSelectorContainer>
            )}
          </FormInputs>
        </Form>
      )}
      <WebPageTestLink href={getWebPageTestUrl()} target={'_blank'}>
        <FormattedMessage id="Audits.webpagetest_results" />
      </WebPageTestLink>
    </Container>
  );
};

export default WebPageTestBlock;
