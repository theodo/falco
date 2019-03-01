import styled from 'styled-components';

const StyledRoot = {
  Container: styled.div`
    height: 100%;
    background-color: #f0f4fe;
    font-family: 'IBM Plex Sans', sans-serif;
  `,
  Header: styled.div`
    align-items: center;
    background-color: #374894;
    color: #f8f9fa;
    display: flex;
    height: 70px;
    padding: 0 20px;
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
};

export default StyledRoot;
