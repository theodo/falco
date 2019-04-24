import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, getSpacing, lineHeight } from 'stylesheet';

const StyledRoot = {
  Container: styled.div`
    height: 100%;
    font-family: ${fontFamily.mainSans};
  `,
  Header: styled.div`
    align-items: center;
    background-color: ${colorUsage.headerBackground};
    color: ${colorUsage.headerText};
    display: flex;
    justify-content: space-between;
    height: 70px;
    padding: 0 ${getSpacing(4)};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  `,
  Link: styled(Link)`
    text-decoration: none;
    color: ${colorUsage.headerText};
  `,
  LogoContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  Logo: styled.img`
    width: 50px;
    height: 25px;
    margin-right: ${getSpacing(4)};
  `,
  LogoTitle: styled.h1`
    letter-spacing: 2px;
    font-weight: 600;
    font-size: ${fontSize.Xlarge};
  `,
  Nav: styled.nav``,
  NavBlock: styled.ul`
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding: 0;
    margin: 0;
  `,
  NavItem: styled.li`
    list-style: none;
    margin-left: ${getSpacing(4)};
    line-height: ${lineHeight.header};
    font-weight: 600;
    letter-spacing: 1px;

    &:first-of-type {
      margin-left: 0;
    }

    &.active {
      box-shadow: inset 0 -6px ${colorUsage.headerText};
    }
  `,
};

export default StyledRoot;
