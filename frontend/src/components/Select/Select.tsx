import * as React from 'react';
import { Props as ReactSelectProps } from 'react-select/lib/Select';
import { colorUsage } from 'stylesheet';
import Style from './Select.style';

interface OwnProps {
  margin?: string;
  width?: string;
}

interface Value {
  label: string;
  value: string;
}

type Props = OwnProps & ReactSelectProps<Value>;

const Select: React.FunctionComponent<Props> = props => {
  const { margin, width, ...otherProps } = props;

  const scriptSelectStyle = {
    control: (provided: Value) => ({
      ...provided,
      borderColor: colorUsage.inputSelectBorder,
      borderRadius: '3px',
    }),
    dropdownIndicator: (provided: Value) => ({
      ...provided,
      color: colorUsage.inputSelectBorder,
    }),
    indicatorSeparator: (provided: Value) => ({
      ...provided,
      backgroundColor: colorUsage.inputSelectBorder,
    }),
    option(provided: Value, state: ReactSelectProps<Value>) {
      if (state.isSelected) {
        return provided;
      }
      if (state.isDisabled) {
        return {
          ...provided,
          ':active': {
            backgroundColor: 'transparent',
          },
          backgroundColor: 'transparent',
          color: colorUsage.inputDisabledSelectText,
        };
      }
      return {
        ...provided,
        color: colorUsage.inputSelectText,
      };
    },
    singleValue: (provided: Value) => ({
      ...provided,
      color: colorUsage.inputSelectText,
    }),
  };

  return (
    <Style.Select
      margin={margin}
      width={width}
      isSearchable
      styles={scriptSelectStyle}
      {...otherProps}
    />
  );
};

export default Select;
