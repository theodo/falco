import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

interface ItemWithMarginProps {
  margin?: string;
}

const Styles = {
  FirstBlockContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: ${getSpacing(20)};
  `,

  FirstBlockColumn: styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,

  Title: styled.div`
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
  `,

  FalcoIllustration: styled.img`
    height: 303px;
    width: 475px;
    border-radius: 6px;
    box-shadow: 0 14px 21px 0 ${colorUsage.landingImageShadowBox};
  `,

  SecondBlockContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: ${getSpacing(10)};
  `,

  SecondBlockColumn: styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  `,

  SubTitle: styled.div`
    line-height: ${lineHeight.h3Text};
    color: ${colorUsage.h3Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h3Text};
    font-weight: ${fontWeight.h3Text};
    margin-bottom: ${getSpacing(2)};
  `,

  FunctionalIllustration: styled.img`
    height: 191px;
    width: 266px;
    margin-bottom: ${getSpacing(6)};
  `,

  Description: styled.div`
    width: 265px;
    text-align: center;
    line-height: ${lineHeight.bodyText};
    color: ${colorUsage.bodyText};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.bodyText};
  `,
};

export default Styles;
