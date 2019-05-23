import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

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
  `,

  FeaturesContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${getSpacing(6)} 0 ${getSpacing(4)} 0;
  `,

  FeatureContainer: styled.div`
    height: 100%;
    width: 266px;
    display: flex;
    align-items: center;
    flex-direction: column;
  `,

  FeatureTitle: styled.h4`
    line-height: ${lineHeight.h4Text};
    color: ${colorUsage.h4Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h4Text};
    font-weight: ${fontWeight.h4Text};
    margin-bottom: ${getSpacing(2)};
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
