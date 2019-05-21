import styled from 'styled-components';
import { getSpacing } from 'stylesheet';

const Styles = {
  FooterContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${getSpacing(6)} ${getSpacing(20)};
  `,

  TheodoLogoLink: styled.a`
    text-decoration: none;
  `,

  TheodoLogo: styled.img`
    height: 20px;
  `,
};

export default Styles;
