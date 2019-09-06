import styled from 'styled-components';
import { colorUsage, fontFamily, getSpacing, responsiveThreshold } from 'stylesheet';

interface ContentProps {
  shouldDisplayMenu: boolean;
}

interface PageBackgroundProps {
  isLandingPage: boolean;
}

export const PageContainer = styled.div`
  height: auto;
  width: auto;
`;
PageContainer.displayName = 'PageContainer';

export const PageBackground = styled.div<PageBackgroundProps>`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: ${props => props.isLandingPage && colorUsage.landingPageGlobalBackground};
`;
PageBackground.displayName = 'PageBackground';

export const Page = styled.div`
  height: 100%;
  font-family: ${fontFamily.mainSans};
  width: 100%;
  margin: auto;
  background-color: ${colorUsage.defaultContentBackground};

  @media only screen and (max-width: ${responsiveThreshold}) {
    width: 100%;
    margin: auto;
  }
`;
Page.displayName = 'Page';

export const Body = styled.div``;
Body.displayName = 'Body';

export const Content = styled.div<ContentProps>`
  position: relative;
  top: 100px;
  left: ${props => (props.shouldDisplayMenu ? '430px' : '0')};
  padding-left: ${props => (props.shouldDisplayMenu ? getSpacing(8) : '0')};
  padding-right: ${props => (props.shouldDisplayMenu ? getSpacing(22) : '0')};
  padding-top: ${getSpacing(4)};
  width: ${props => (props.shouldDisplayMenu ? 'calc(100% - 580px)' : '100%')};
  background-color: ${colorUsage.defaultContentBackground};
  display: flex;
  justify-content: center;
  min-width: 800px;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: ${responsiveThreshold}) {
    min-width: unset;
  }
`;
Content.displayName = 'Content';
