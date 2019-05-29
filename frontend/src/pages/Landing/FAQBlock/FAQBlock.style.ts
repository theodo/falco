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

interface ItemWithMarginProps {
  margin?: string;
}

const Styles = {
  FAQBlockContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${getSpacing(6)} ${getSpacing(20)};
    font-family: ${fontFamily.mainSans};

    @media only screen and (max-width: ${responsiveThreshold}) {
      padding: ${getSpacing(6)} 0;
    }
  `,

  FAQBlockTitle: styled.h2`
    color: ${colorUsage.h2Text};
    font-size: ${fontSize.h2Text};
    line-height: ${lineHeight.h2Text};
    font-weight: ${fontWeight.h2Text};

    @media only screen and (max-width: ${responsiveThreshold}) {
      font-size: ${fontSize.h4Text};
      line-height: ${lineHeight.h4Text};
      margin-bottom: ${getSpacing(6)};
    }
  `,

  FAQBlockColumnsContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    padding: ${getSpacing(6)} 0;

    @media only screen and (max-width: ${responsiveThreshold}) {
      justify-content: center;
      padding: 0;
    }
  `,

  FAQBlockColumn: styled.div`
    width: 370px;
    height: 100%;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: ${responsiveThreshold}) {
      width: 260px;
    }
  `,

  FAQBlock: styled.div`
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};

    @media only screen and (max-width: ${responsiveThreshold}) {
      margin-bottom: ${getSpacing(4)};
    }
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
