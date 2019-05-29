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
  IntroductionBlockContainer: styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: repeat(3, max-content);
    padding: ${getSpacing(8)} 0 ${getSpacing(18)} 0;

    @media only screen and (max-width: ${responsiveThreshold}) {
      grid-template-columns: 100%;
      grid-template-rows: repeat(4, max-content);
      padding: 0;
    }
  `,

  IntroductionBlockTitle: styled.h1`
    grid-row-start: 1;
    grid-column-start: 1;
    width: 370px;
    line-height: ${lineHeight.h1Text};
    color: ${colorUsage.h1Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h1Text};
    font-weight: ${fontWeight.h1Text};
    margin: 0 auto ${getSpacing(6)} auto;

    @media only screen and (max-width: ${responsiveThreshold}) {
      width: 260px;
      line-height: ${lineHeight.h3Text};
      font-size: ${fontSize.h3Text};
    }
  `,

  Introduction: styled.div`
    grid-row-start: 2;
    grid-column-start: 1;
    width: 370px;
    line-height: ${lineHeight.introductionText};
    color: ${colorUsage.introductionText};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.introductionText};
    margin: 0 auto ${getSpacing(6)} auto;

    @media only screen and (max-width: ${responsiveThreshold}) {
      grid-row-start: 3;
      grid-column-start: 1;
      width: 260px;
    }
  `,

  FalcoIllustration: styled.img`
    grid-row-start: 1;
    grid-row-end: 4;
    grid-column-start: 2;
    width: 599px;

    @media only screen and (max-width: ${responsiveThreshold}) {
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 1;
      width: 300px;
      margin: 0 auto ${getSpacing(10)} auto;
    }
  `,
};

export default Styles;
