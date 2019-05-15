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

  FirstBlockTitle: styled.h1`
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
    margin: 0 0 ${getSpacing(6)} 0;
  `,

  FalcoIllustration: styled.img`
    width: 520px;
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

  SecondBlockTitle: styled.h4`
    line-height: ${lineHeight.h4Text};
    color: ${colorUsage.h4Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h4Text};
    font-weight: ${fontWeight.h4Text};
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

  ThirdBlockContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${getSpacing(6)} ${getSpacing(20)};
    font-family: ${fontFamily.mainSans};
  `,

  ThirdBlockTitle: styled.h2`
    color: ${colorUsage.h2Text};
    font-size: ${fontSize.h2Text};
    line-height: ${lineHeight.h2Text};
    font-weight: ${fontWeight.h2Text};
  `,

  ThirdBlockColumnsContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${getSpacing(6)} 0;
  `,

  ThirdBlockColumn: styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  `,

  FAQBlock: styled.div`
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  `,

  FAQQuestion: styled.h4`
    color: ${colorUsage.h4Text};
    font-size: ${fontSize.h4Text};
    line-height: ${lineHeight.h4Text};
    font-weight: ${fontWeight.h4Text};
    margin-bottom: ${getSpacing(4)};
  `,

  FAQAnswer: styled.div`
    color: ${colorUsage.bodyText};
    font-size: ${fontSize.bodyText};
    line-height: ${lineHeight.bodyText};
  `,

  TheodoLink: styled.a`
    color: ${colorUsage.landingTheodoLink};
    font-weight: ${fontWeight.landingTheodoLink};
    text-decoration: none;
  `,
};

export default Styles;
