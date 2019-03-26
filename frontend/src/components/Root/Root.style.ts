import styled from 'styled-components';

const StyledRoot = {
  Container: styled.div`
    height: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
  `,
  Header: styled.div`
    a {
      text-decoration: none;
      color: inherit;
    }
    align-items: center;
    background-color: #374894;
    color: #f8f9fa;
    display: flex;
    justify-content: space-between;
    height: 70px;
    padding: 0 20px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  `,
  Logo: styled.div`
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 25px;
      margin-right: 20px;
    }
    h1 {
      letter-spacing: 2px;
      font-weight: 600;
      font-size: 24px;
    }
  `,
  Nav: styled.nav`
    ul {
      display: flex;
      justify-content: center;
      flex-direction: row;
      padding: 0;
      margin: 0;
    }
    li {
      list-style: none;
      margin-left: 20px;
      line-height: 70px;
      font-weight: 600;
      letter-spacing: 1px;
    }
    li:first-of-type {
      margin-left: 0;
    }
    li.active {
      box-shadow: inset 0 -6px #f8f9fa;
    }
  `,
};

export default StyledRoot;
