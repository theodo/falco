import { InjectedFormikProps } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import Style from './ProjectDetailsInput.style';

type Props = InjectedFormikProps<any, any>;

export const ProjectDetailsInput: React.FunctionComponent<Props> = ({
  label,
  onChange,
  onBlur,
  value,
}) => {
  const intl = useIntl();

  return (
    <Style.Field>
      <Style.Label>{intl.formatMessage({ id: label })}</Style.Label>
      <Style.Input onBlur={onBlur} onChange={onChange} value={value} />
    </Style.Field>
  );
};
