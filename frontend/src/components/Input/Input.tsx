import { InjectedFormikProps } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import Style from './Input.style';

type Props = InjectedFormikProps<any, any>;

export const Input: React.FunctionComponent<Props> = ({
  disabled,
  error,
  field,
  label,
  name,
  type,
}) => {
  const intl = useIntl();

  const [isActive, setIsActive] = React.useState(false);
  const [value, setValue] = React.useState('');

  const componentsClassName = `${!disabled && (isActive || value || error) ? 'active' : ''}  ${
    error ? ' error' : ''
  }`;

  return (
    <Style.Field>
      <Style.Input
        name={name}
        type={type}
        placeholder={isActive ? '' : intl.formatMessage({ id: label })}
        onFocusCapture={() => setIsActive(true)}
        onBlurCapture={() => setIsActive(false)}
        onChangeCapture={event => {
          setValue((event.target as HTMLInputElement).value);
        }}
        disabled={disabled}
        className={componentsClassName}
        {...field}
      />
      <Style.Label className={componentsClassName}>
        {error ? intl.formatMessage({ id: error }) : intl.formatMessage({ id: label })}
      </Style.Label>
    </Style.Field>
  );
};
