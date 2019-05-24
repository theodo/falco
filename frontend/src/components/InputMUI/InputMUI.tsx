import { createStyles, TextField, WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { TextFieldProps } from '@material-ui/core/TextField';
import { FieldProps } from 'formik';

import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import {
  colorUsage,
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  getSpacing,
  lineHeight,
} from 'stylesheet';

interface OwnProps extends WithStyles<typeof styles> {
  error?: string | null;
  label: string;
  field: FieldProps;
}

const styles = (theme: any) =>
  createStyles({
    root: {
      marginTop: '1px',
      '& input': {
        padding: getSpacing(2),
      },
      '& label': {
        transform: 'translate(10px, 10px) scale(1)',
      },
      width: '100%',
    },
    label: {
      fontSize: fontSize.inputTextPlaceholder,
      lineHeight: lineHeight.inputTextPlaceholder,
      fontFamily: fontFamily.mainSans,
      color: colorUsage.inputTextPlaceholder,
      '&$labelError': {
        color: colorUsage.inputTextError,
      },
    },
    labelFocused: {},
    labelError: {},
    input: {
      fontSize: fontSize.inputText,
      lineHeight: lineHeight.inputText,
      fontFamily: fontFamily.mainSans,
      color: colorUsage.inputText,
      '&:not($inputFocused):not($inputDisabled):not($inputError) $notchedOutline': {
        borderColor: colorUsage.inputText,
        borderWidth: '1px',
      },
      '&:hover:not($inputDisabled):not($inputFocused):not($inputError) $notchedOutline': {
        borderColor: colorUsage.inputText,
        borderWidth: '1px',
      },
      '&$inputFocused $notchedOutline': {
        borderColor: colorUsage.inputTextFocused,
        borderWidth: '2px',
      },
      '&$inputError $notchedOutline': {
        borderColor: colorUsage.inputTextError,
        borderWidth: '2px',
      },
    },
    inputFocused: {},
    inputError: {},
    inputDisabled: {},
    notchedOutline: {},
    formHelper: {
      fontSize: fontSize.inputErrorMessage,
      lineHeight: lineHeight.inputErrorMessage,
      fontWeight: fontWeight.inputErrorMessage,
      fontStyle: fontStyle.inputErrorMessage,
      fontFamily: fontFamily.mainSans,
      '&$formHelperError': {
        color: colorUsage.inputTextError,
      },
    },
    formHelperError: {},
  });

type Props = OwnProps & TextFieldProps & InjectedIntlProps;

const InputMUI: React.FunctionComponent<Props> = ({ classes, disabled, error, field, intl, label, type }) => {
  return (
    <TextField
      variant="outlined"
      error={!!error}
      helperText={(error && intl.formatMessage({ id: error || '' })) || null}
      label={intl.formatMessage({ id: label })}
      className={`${classes && classes.root}`}
      InputLabelProps={{
        classes: {
          root: classes && classes.label,
          focused: classes && classes.labelFocused,
          error: classes && classes.labelError,
        },
      }}
      InputProps={{
        classes: {
          root: classes && classes.input,
          focused: classes && classes.inputFocused,
          notchedOutline: classes && classes.notchedOutline,
          error: classes && classes.inputError,
          disabled: classes && classes.inputDisabled,
        },
      }}
      FormHelperTextProps={{
        classes: {
          root: classes && classes.formHelper,
          error: classes && classes.formHelperError,
        },
      }}
      {...field}
      type={type}
      disabled={disabled}
    />
  );
};

export default withStyles(styles)(InputMUI);
