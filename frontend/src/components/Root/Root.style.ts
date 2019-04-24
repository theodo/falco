import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledRoot = {
  Container: styled.div`
    height: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
  `,
  Header: styled.div`
    align-items: center;
    background-color: #374894;
    color: #f8f9fa;
    display: flex;
    justify-content: space-between;
    height: 70px;
    padding: 0 20px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  `,
  Link: styled(Link)`
    text-decoration: none;
    color: inherit;
  `,
  LogoContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  Logo: styled.img`
    width: 50px;
    height: 25px;
    margin-right: 20px;
  `,
  LogoTitle: styled.h1`
    letter-spacing: 2px;
    font-weight: 600;
    font-size: 24px;
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
    margin-left: 20px;
    line-height: 70px;
    font-weight: 600;
    letter-spacing: 1px;

    &:first-of-type {
      margin-left: 0;
    }

    &.active {
      box-shadow: inset 0 -6px #f8f9fa;
    }
  `,
};

export default StyledRoot;
