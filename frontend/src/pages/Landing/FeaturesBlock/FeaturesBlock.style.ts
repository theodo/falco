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
  FeaturesBlockContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${getSpacing(6)} ${getSpacing(20)};
    font-family: ${fontFamily.mainSans};
  `,

  FeaturesBlockTitle: styled.h2`
    color: ${colorUsage.h2Text};
    font-size: ${fontSize.h2Text};
    line-height: ${lineHeight.h2Text};
    font-weight: ${fontWeight.h2Text};

    @media only screen and (max-width: ${responsiveThreshold}) {
      font-size: ${fontSize.h4Text};
      line-height: ${lineHeight.h4Text};
      margin-bottom: ${getSpacing(7)};
    }
  `,

  FeaturesContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    padding: ${getSpacing(6)} 0 ${getSpacing(4)} 0;

    @media only screen and (max-width: ${responsiveThreshold}) {
      padding: 0;
    }
  `,

  FeatureContainer: styled.div`
    height: 100%;
    width: 266px;
    display: flex;
    align-items: center;
    flex-direction: column;

    @media only screen and (max-width: ${responsiveThreshold}) {
      margin-bottom: ${getSpacing(6)};
    }
  `,

  FeatureTitle: styled.h4`
    line-height: ${lineHeight.h4Text};
    color: ${colorUsage.h4Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h4Text};
    font-weight: ${fontWeight.h4Text};
    margin-bottom: ${getSpacing(2)};

    @media only screen and (max-width: ${responsiveThreshold}) {
      font-size: ${fontSize.labelText};
      line-height: ${lineHeight.labelText};
    }
  `,

  FeatureIllustration: styled.img`
    width: 266px;
    min-height: 210px;
    margin-bottom: ${getSpacing(4)};
  `,

  FeatureDescription: styled.div`
    text-align: center;
    line-height: ${lineHeight.bodyText};
    color: ${colorUsage.bodyText};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.bodyText};
  `,
};

export default Styles;
