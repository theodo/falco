import { TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';

interface Props {
  label?: string | null;
  error?: string | null;
  type: string;
  disabled?: boolean;
  field: {
    name?: string;
    onBlur?: () => any;
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => void;
    value?: string;
  };
}

const Input: React.SFC<Props> = props => {
  const { error, field, ...otherProps } = props;

  return (
    <TextField
      variant="outlined"
      margin="normal"
      error={!!error}
      helperText={error || null}
      {...field}
      {...otherProps}
    />
  );
};

export default Input;
