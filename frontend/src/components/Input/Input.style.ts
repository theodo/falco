import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, lineHeight } from 'stylesheet';

const Styles = {
  Field: styled.div`
    position: relative;
    width: 100%;
    height: 56px;
    border-radius: 6px;
  `,

  Input: styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 56px;
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.inputText};
    line-height: ${lineHeight.inputText};
    color: ${colorUsage.inputText};
    transition: 0.2s all ease-in-out;
    background-color: ${colorUsage.inputTextBackground};

    &.active {
      padding: 28px 0 8px 0;
    }

    &::placeholder {
      color: ${colorUsage.inputText};
    }
  `,

  Label: styled.label`
    position: absolute;
    top: 28px;
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
  `,
};

export default Styles;
