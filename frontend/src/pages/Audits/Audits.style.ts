import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

const StyledAudits = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
  `,

  PageTitleBlock: styled.div`
    margin-bottom: ${getSpacing(4)};
    width: 75%;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  PageTitle: styled.div`
    line-height: ${lineHeight.h1Text};
    color: ${colorUsage.h1Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h1Text};
    font-weight: ${fontWeight.h1Text};
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  Title: styled.div`
    line-height: ${lineHeight.h2Text};
    color: ${colorUsage.h2Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h2Text};
    font-weight: ${fontWeight.h2Text};
    margin-bottom: ${getSpacing(4)};
  `,

  ScriptStepBlock: styled.div`
    display: flex;
    flex-direction: column;
  `,

  ScriptStepBlockTitle: styled.div`
    font-size: ${fontSize.inputSelectLabelText};
    line-height: ${lineHeight.inputSelectLabelText};
    font-weight: ${fontWeight.inputSelectLabelText};
    color: ${colorUsage.inputSelectLabelText};
    margin-bottom: ${getSpacing(2)};
  `,
};

export default StyledAudits;
