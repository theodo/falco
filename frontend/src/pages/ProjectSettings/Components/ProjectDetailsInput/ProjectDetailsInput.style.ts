import styled from 'styled-components';
import {
  colorUsage,
  fontFamily,
  fontSize,
  fontWeight,
  getSpacing,
  lineHeight,
} from 'stylesheet';

const Styles = {
  Field: styled.div`
    display: flex;
    align-items: center;
  `,

  Input: styled.input`
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.inputText};
    line-height: ${lineHeight.inputText};
    color: ${colorUsage.inputText};
    border: solid;
    border-width: 1px;
    border-radius: 2px;
    margin-left: ${getSpacing(3)};
    padding: ${getSpacing(1)};
  `,

  Label: styled.label`
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.inputTextLabel};
    line-height: ${lineHeight.inputTextLabel};
    font-weight: ${fontWeight.inputTextLabel};
    color: ${colorUsage.inputTextLabel};
  `,
};

export default Styles;
