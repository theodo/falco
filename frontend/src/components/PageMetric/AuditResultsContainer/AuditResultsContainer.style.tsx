import styled from 'styled-components';
import { getSpacing } from 'stylesheet';

const Style = {
  Container: styled.div`
    border: solid 2px #9ba3c9;
    border-radius: 0 0 ${getSpacing(1)} ${getSpacing(1)};
    box-sizing: border-box;
    padding: ${getSpacing(2)} ${getSpacing(4)};
    width: 100%;
  `,
};

export default Style;
