import styled from 'styled-components'
import { colorUsage, getSpacing } from 'stylesheet';

const Styles = {
  Container: styled.div`
    margin: ${getSpacing(20)} auto 0;
    width: 400px;
    text-align: center;
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
