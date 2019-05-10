import styled from 'styled-components';
import { colorUsage, fontFamily, getSpacing } from 'stylesheet';

interface ContentProps {
  shouldDisplayMenu: boolean;
}

interface PageBackgroundProps {
  isLandingPage: boolean;
}

const StyledRoot = {
  PageContainer: styled.div`
    height: auto;
    width: auto;
  `,
  PageBackground: styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: ${(props: PageBackgroundProps) => props.isLandingPage && colorUsage.landingPageGlobalBackground};
  `,
  Page: styled.div`
    height: 100%;
    font-family: ${fontFamily.mainSans};
    width: 1440px;
    margin: auto;
    background-color: ${colorUsage.defaultContentBackground};
  `,
  Body: styled.div``,
  Content: styled.div`
    position: relative;
    top: 100px;
    left: ${(props: ContentProps) => (props.shouldDisplayMenu ? '490px' : '0')};
    margin-left: ${(props: ContentProps) => (props.shouldDisplayMenu ? getSpacing(8) : '0')};
    padding-right: ${(props: ContentProps) => (props.shouldDisplayMenu ? getSpacing(22) : '0')};
    padding-top: ${getSpacing(4)};
    width: ${(props: ContentProps) => (props.shouldDisplayMenu ? '800px' : '100%')};
    background-color: ${colorUsage.defaultContentBackground};
  `,
};

export default StyledRoot;
