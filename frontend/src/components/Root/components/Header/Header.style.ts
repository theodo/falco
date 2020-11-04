import Button from 'components/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  colorUsage,
  fontSize,
  fontWeight,
  getSpacing,
  inheritVar,
  lineHeight,
  responsiveThreshold,
  zIndex,
} from 'stylesheet';

interface MenuProps {
  isMenuDisplayed: boolean;
}

interface HeaderProps {
  shouldHaveShadow: boolean;
}

interface MenuItemProps {
  right: string;
}

export const HeaderMenu = styled.div<MenuProps>`
  display: flex;
  padding-left: ${getSpacing(10)};
  width: 380px;
  background-color: ${props => props.isMenuDisplayed && colorUsage.menuBackground};

  @media only screen and (max-width: ${responsiveThreshold}) {
    width: 100%;
    padding: 0;
  }
`;
HeaderMenu.displayName = 'HeaderMenu';

export const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: ${zIndex.header};
  width: 100%;

  @media only screen and (max-width: ${responsiveThreshold}) {
    position: absolute;
  }
`;
HeaderContainer.displayName = 'HeaderContainer';

export const HeaderBlock = styled.header<HeaderProps>`
  background-color: ${colorUsage.headerFakeBackground};
  height: 100px;
  display: flex;
  justify-content: space-between;
  transition: box-shadow 0.3s ease-in-out;
  box-shadow: ${props => props.shouldHaveShadow && `0 10px 5px -2px ${colorUsage.headerShadowBox}`};

  @media only screen and (max-width: ${responsiveThreshold}) {
    box-shadow: none;
  }
`;
HeaderBlock.displayName = 'HeaderBlock';

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  @media only screen and (max-width: ${responsiveThreshold}) {
    padding-left: ${getSpacing(6)};
  }
`;
LogoContainer.displayName = 'LogoContainer';

export const LogoBlock = styled.div`
  width: 53px;
  height: 25px;
  margin-right: ${getSpacing(4)};
`;
LogoBlock.displayName = 'LogoBlock';

export const LogoTitle = styled.span`
  color: ${colorUsage.logoText};
  line-height: ${lineHeight.logoText};
  font-weight: ${fontWeight.logoText};
  font-size: ${fontSize.logoText};
`;
LogoTitle.displayName = 'LogoTitle';

export const HeaderContent = styled.div<HeaderProps>`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding-left: ${getSpacing(8)};
  padding-right: ${getSpacing(22)};
  transition: box-shadow 0.3s ease-in-out;
  box-shadow: ${props => props.shouldHaveShadow && `0 10px 5px -2px ${colorUsage.headerShadowBox}`};
  width: calc(100% - 580px);

  @media only screen and (max-width: ${responsiveThreshold}) {
    display: none;
  }
`;
HeaderContent.displayName = 'HeaderContent';

export const Nav = styled.nav``;
Nav.displayName = 'Nav';

export const HeaderButtonsBlock = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 0;
  margin: 0;
`;
HeaderButtonsBlock.displayName = 'HeaderButtonsBlock';

export const HeaderMenuItem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  color: ${colorUsage.menuLink};
  border-color: ${colorUsage.menuLink};
  line-height: ${lineHeight.menuLink};
  font-weight: ${fontWeight.menuLink};
  font-size: ${fontSize.menuLink};
  margin-left: ${getSpacing(4)};
  user-select: none;
  cursor: pointer;
  position: relative;

  &:hover {
    color: ${colorUsage.headerButtonHoverText};
    border-color: ${colorUsage.headerButtonHoverText};
  }

  &:first-of-type {
    margin-left: 0;
  }
`;
HeaderMenuItem.displayName = 'HeaderMenuItem';

export const HeaderMenuItemContent = styled.div<MenuItemProps>`
  position: absolute;
  top: 100px;
  right: ${props => props.right}px;
`;
HeaderMenuItemContent.displayName = 'HeaderMenuItemContent';

export const HeaderButton = styled(Button)`
  color: ${inheritVar};
  font: ${inheritVar};
`;
HeaderButton.displayName = 'HeaderButton';

export const HeaderButtonArrow = styled.span`
  width: 0;
  height: 0;
  margin-left: ${getSpacing(1)};
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top-width: 5px;
  border-top-style: solid;
`;
HeaderButtonArrow.displayName = 'HeaderButtonArrow';

export const HeaderLink = styled(Link)`
  text-decoration: none;
  color: ${colorUsage.menuLink};
  line-height: ${lineHeight.menuLink};
  font-weight: ${fontWeight.menuLink};
  font-size: ${fontSize.menuLink};
  user-select: none;
  cursor: pointer;
  margin-left: 20px;

  &:hover {
    color: ${colorUsage.menuLinkHover};
  }
`;
HeaderLink.displayName = 'HeaderLink';
