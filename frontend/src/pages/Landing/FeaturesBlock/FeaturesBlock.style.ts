import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

interface ItemWithMarginProps {
  margin?: string;
}

const Styles = {
  FeaturesBlockContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: ${getSpacing(10)};
  `,

  FeaturesBlockColumn: styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  `,

  FeaturesBlockTitle: styled.h4`
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
};

export default Styles;
