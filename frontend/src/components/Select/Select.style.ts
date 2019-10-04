import Select from 'react-select';
import styled from 'styled-components';
import { fontFamily, fontSize, lineHeight } from 'stylesheet';

interface SelectProps {
  margin?: string;
  width?: string;
  display?: string;
}

const StyledSelect = {
  Select: styled(Select)`
    width: ${(props: SelectProps) => (props.width ? props.width : '300px')};
    margin: ${(props: SelectProps) => (props.margin ? props.margin : '0')};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.inputSelectText};
    line-height: ${lineHeight.inputSelectText};
    display: ${(props: SelectProps) => (props.display ? props.display : 'visible')}
  `,
};

export default StyledSelect;
