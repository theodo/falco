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
  CustomersBlockContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${getSpacing(6)} ${getSpacing(20)};
    font-family: ${fontFamily.mainSans};

    @media only screen and (max-width: ${responsiveThreshold}) {
      padding: ${getSpacing(6)} ${getSpacing(10)} 0 ${getSpacing(10)};
    }
  `,

  CustomersBlockTitle: styled.h2`
    color: ${colorUsage.h2Text};
    font-size: ${fontSize.h2Text};
    line-height: ${lineHeight.h2Text};
    font-weight: ${fontWeight.h2Text};

    @media only screen and (max-width: ${responsiveThreshold}) {
      font-size: ${fontSize.h4Text};
      line-height: ${lineHeight.h4Text};
    }
  `,

  CustomersBlockLogosContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    padding: ${getSpacing(7)} 0 ${getSpacing(4)} 0;
  `,

  CustomersBlockLogo: styled.img`
    height: 40px;

    @media only screen and (max-width: ${responsiveThreshold}) {
      height: 20px;
      margin-bottom: ${getSpacing(5)};
    }
  `,
};

export default Styles;
