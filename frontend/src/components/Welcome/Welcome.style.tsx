import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

const Style = {
  WelcomeBlockContainer: styled.div`
    margin: 0 200px
  `,

  WelcomeBlockTitle: styled.h1`
    line-height: ${lineHeight.h1Text};
    color: ${colorUsage.h1Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h1Text};
    font-weight: ${fontWeight.h1Text};
    margin-top: ${getSpacing(4)};
    margin-bottom: ${getSpacing(12)};
  `,

  WelcomeBlockText: styled.div`
    line-height: ${lineHeight.introductionText};
    color: ${colorUsage.introductionText};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.introductionText};
  `,

  WelcomeBlockTextParagraph: styled.p`
    margin-bottom: ${getSpacing(8)};
  `,
};

export default Style;
