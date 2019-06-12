import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

const Style = {
  Close: styled.div`
    position: absolute;
    top: 40px;
    left: 1350px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 1;
  `,

  PageTitle: styled.div`
    line-height: ${lineHeight.h1Text};
    color: ${colorUsage.h1Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h1Text};
    font-weight: ${fontWeight.h1Text};
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  PageSubTitle: styled.div`
    line-height: ${lineHeight.h3Text};
    color: ${colorUsage.h3Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h3Text};
    font-weight: ${fontWeight.h3Text};
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};

export default Style;
