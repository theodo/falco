import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';

const Styles = {
  Container: styled.div`
    width: 100 %;
    min-height: 400px;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  FormError: styled.div`
    padding: ${getSpacing(3)};
    color: ${colorUsage.popinErrorText};
    background-color: ${colorUsage.popinErrorBackground};
    border-radius: ${getSpacing(1)};
    margin: 0 0 ${getSpacing(6)} 0;
    white-space: pre-wrap;
  `,
};

export default Styles;
