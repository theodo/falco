import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

const Styles = {
  IntroductionBlockContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: ${getSpacing(8)} 0 ${getSpacing(18)} 0;
  `,

  IntroductionBlockColumn: styled.div`
    width: 470px;
    display: flex;
    flex-direction: column;
    padding: 0 ${getSpacing(17)} 0 ${getSpacing(13)};
  `,

  IntroductionBlockPitch: styled.div`
    display: flex;
    flex-direction: column;
    padding-left: ${getSpacing(7)};
  `,

  IntroductionBlockTitle: styled.h1`
    width: 370px;
    line-height: ${lineHeight.h1Text};
    color: ${colorUsage.h1Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h1Text};
    font-weight: ${fontWeight.h1Text};
    margin: 0 0 ${getSpacing(6)} 0;
  `,

  Introduction: styled.div`
    width: 370px;
    line-height: ${lineHeight.introductionText};
    color: ${colorUsage.introductionText};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.introductionText};
    margin: 0 0 ${getSpacing(10)} 0;
  `,

  FalcoIllustration: styled.img`
    width: 599px;
  `,
};

export default Styles;
