import React from 'react';
import { FormattedMessage } from 'react-intl';
import Style from './ProjectDetailsInput.style';

interface Props {
  label: string;
  value: string;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProjectDetailsInput: React.FunctionComponent<Props> = ({
  label,
  onChange,
  onBlur,
  value,
}) => {
  return (
    <Style.Field>
      <Style.Label>
        <FormattedMessage id={label} />
      </Style.Label>
      <Style.Input onBlur={onBlur} onChange={onChange} value={value} />
    </Style.Field>
  );
};
