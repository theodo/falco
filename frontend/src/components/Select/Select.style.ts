import Select from 'react-select';
import { Props as ReactSelectProps } from 'react-select/lib/Select';
import styled from 'styled-components';
import { fontFamily, fontSize, lineHeight } from 'stylesheet';

interface SelectProps {
  margin?: string;
  width?: string;
}

const StyledSelect = {
  Select: styled(Select)`
    width: ${(props: SelectProps) => (props.width ? props.width : '300px')};
    margin: ${(props: SelectProps) => (props.margin ? props.margin : '0')};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.inputSelectText};
    line-height: ${lineHeight.inputSelectText};
  `,
};

export default StyledSelect;
