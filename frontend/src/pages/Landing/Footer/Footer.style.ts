import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, getSpacing, lineHeight } from 'stylesheet';

const Styles = {
  FooterContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${getSpacing(6)} ${getSpacing(20)} ${getSpacing(10)} ${getSpacing(20)};
    line-height: ${lineHeight.introductionText};
    color: ${colorUsage.introductionText};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.introductionText};

    @media only screen and (max-width: 1240px) {
      display: none;
    }
  `,

  TheodoLink: styled.a`
    color: ${colorUsage.landingTheodoLink};
    text-decoration: none;
  `,
};

export default Styles;
