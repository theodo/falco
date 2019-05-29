import styled from 'styled-components';
import {
  colorUsage,
  fontFamily,
  fontSize,
  fontWeight,
  getSpacing,
  lineHeight,
  responsiveThreshold,
} from 'stylesheet';

const Styles = {
  Field: styled.div`
    position: relative;
    width: 100%;
    height: 54px;
    border-radius: 6px;

    @media only screen and (max-width: ${responsiveThreshold}) {
      border: 1px solid ${colorUsage.leadFormBorder};
      padding: 0 0 0 ${getSpacing(5)};
      margin: 0 0 ${getSpacing(2)} 0;
    }
  `,

  Input: styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 54px;
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.inputText};
    line-height: ${lineHeight.inputText};
    color: ${colorUsage.inputText};
    transition: 0.2s all ease-in-out;
    background-color: ${colorUsage.inputTextBackground};

    &.active {
      padding: 27px 0 8px 0;
    }

    &::placeholder {
      color: ${colorUsage.inputText};
    }
  `,

  Label: styled.label`
    position: absolute;
    top: 27px;
    left: 0;
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.inputTextLabel};
    line-height: ${lineHeight.inputTextLabel};
    font-weight: ${fontWeight.inputTextLabel};
    color: ${colorUsage.inputTextLabel};
    opacity: 0;
    pointer-events: none;
    transition: 0.2s all ease-in-out;

    &.active {
      top: 8px;
      opacity: 1;
    }

    &.error {
      color: ${colorUsage.inputTextError};
    }

    @media only screen and (max-width: ${responsiveThreshold}) {
      padding: 0 0 0 ${getSpacing(5)};
    }
  `,
};

export default Styles;
