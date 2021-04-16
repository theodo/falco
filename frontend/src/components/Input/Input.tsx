import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Style from './Input.style';

interface Props {
  field: string;
  label: string;
  type: string;
  name: string;
  error: string;
  disabled: boolean;
}

const Input: React.FunctionComponent<Props> = ({ disabled, error, field, label, name, type }) => {
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
        onChangeCapture={(event) => {
          setValue((event.target as HTMLInputElement).value);
        }}
        disabled={disabled}
        className={componentsClassName}
        {...field}
      />
      <Style.Label className={componentsClassName}>
        {error ? <FormattedMessage id={error} /> : <FormattedMessage id={label} />}
      </Style.Label>
    </Style.Field>
  );
};

export default Input;
