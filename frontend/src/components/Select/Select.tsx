import * as React from 'react';
import { Props as ReactSelectProps } from 'react-select/lib/Select';
import { colorUsage } from 'stylesheet';
import Style from './Select.style';

interface OwnProps {
  margin?: string;
  width?: string;
}

type Props = OwnProps & ReactSelectProps<any>;

const Select: React.FunctionComponent<Props> = props => {
  const { margin, width, ...otherProps } = props;

  const scriptSelectStyle = {
    control: (provided: any) => ({
      ...provided,
      borderColor: colorUsage.inputSelectBorder,
      borderRadius: '3px',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: colorUsage.inputSelectBorder,
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: colorUsage.inputSelectBorder,
    }),
    option: (provided: any, state: any) => {
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
    singleValue: (provided: any) => ({
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
