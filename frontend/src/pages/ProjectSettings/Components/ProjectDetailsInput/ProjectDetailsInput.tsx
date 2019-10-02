import { InjectedFormikProps } from 'formik';
import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import Style from './ProjectDetailsInput.style';

type Props = InjectedIntlProps & InjectedFormikProps<any, any>;

export const ProjectDetailsInput: React.FunctionComponent<Props> = ({
  intl,
  label,
  onChange,
  onBlur,
  value,
}) => {

  return (
    <Style.Field>
      <Style.Label>
      {intl.formatMessage({ id: label })}
      </Style.Label>
      <Style.Input
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      />
    </Style.Field>
  );
};
