import styled from 'styled-components';

const StyledRoot = styled.div`
  text-align: center;

  .header {
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
  }

  .logo {
    animation: logo-spin infinite 20s linear;
    height: 80px;
  }

  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default StyledRoot;
