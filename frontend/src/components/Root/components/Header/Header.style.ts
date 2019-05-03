import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colorUsage, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

const StyledHeader = {
  HeaderContainer: styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    z-index: 2;
  `,
  Header: styled.header`
    background-color: ${colorUsage.headerFakeBackground};
    height: 100px;
    display: flex;
  `,
  HeaderMenu: styled.div`
    display: flex;
    padding-left: ${getSpacing(22)};
    width: 380px;
    background-color: ${colorUsage.menuBackground};
  `,
  LogoContainer: styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
  `,
  Logo: styled.div`
    width: 53px;
    height: 25px;
    margin-right: ${getSpacing(4)};
  `,
  LogoTitle: styled.span`
    color: ${colorUsage.logoText};
    line-height: ${lineHeight.logoText};
    font-weight: ${fontWeight.logoText};
    font-size: ${fontSize.logoText};
  `,
  HeaderContent: styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    margin-left: ${getSpacing(8)};
    padding-right: ${getSpacing(22)};
    width: 800px;
  `,
  Nav: styled.nav``,
  HeaderButtonsBlock: styled.ul`
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding: 0;
    margin: 0;
  `,
  HeaderButton: styled.li`
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

    &:hover {
      color: ${colorUsage.headerButtonHoverText};
      border-color: ${colorUsage.headerButtonHoverText};
    }

    &:first-of-type {
      margin-left: 0;
    }
  `,
  HeaderButtonArrow: styled.span`
    width: 0;
    height: 0;
    margin-left: ${getSpacing(1)};
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top-width: 5px;
    border-top-style: solid;
  `,
  MenusContainer: styled.div`
    display: flex;
  `,
};

export default StyledHeader;
