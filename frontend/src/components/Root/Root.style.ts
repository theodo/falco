import styled from 'styled-components';
import { fontFamily, getSpacing } from 'stylesheet';

interface ContentProps {
  isLoginPage: boolean;
}

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
    left: ${(props: ContentProps) => (props.isLoginPage ? '0' : '490px')};
    margin-left: ${getSpacing(8)};
    padding-right: ${getSpacing(22)};
    padding-top: ${getSpacing(4)};
    width: ${(props: ContentProps) => (props.isLoginPage ? '100%' : '800px')};
  `,
};

export default StyledRoot;
