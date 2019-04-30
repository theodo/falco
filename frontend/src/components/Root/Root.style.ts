import styled from 'styled-components';
import { fontFamily, getSpacing } from 'stylesheet';

const StyledRoot = {
  Page: styled.div`
    height: 100%;
    font-family: ${fontFamily.mainSans};
    width: 1440px;
    margin: auto;
  `,
  Body: styled.div``,
  Content: styled.div`
    position: relative;
    top: 100px;
    left: 490px;
    margin-left: ${getSpacing(8)};
    padding-right: ${getSpacing(22)};
    padding-top: ${getSpacing(4)};
    width: 800px;
  `,
};

export default StyledRoot;
