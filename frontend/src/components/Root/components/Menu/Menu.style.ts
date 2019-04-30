import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

const StyledMenu = {
  Container: styled.div`
    position: fixed;
    top: 100px;
    z-index: 10;
    background-color: ${colorUsage.menuBackground};
    padding-left: ${getSpacing(22)};
    width: 380px;
    height: 100%;
  `,

  ProjectName: styled.div`
    line-height: ${lineHeight.h2Text};
    color: ${colorUsage.h2Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h2Text};
    font-weight: ${fontWeight.h2Text};
    margin-bottom: ${getSpacing(4)};
  `,

  Audits: styled.div`
    line-height: ${lineHeight.h3Text};
    color: ${colorUsage.h3Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h3Text};
    font-weight: ${fontWeight.h3Text};
  `,
};

export default StyledMenu;
