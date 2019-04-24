import styled from 'styled-components';
import { getSpacing } from 'stylesheet';

const Style = {
  Container: styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: ${getSpacing(4)} ${getSpacing(20)};
    max-width: 800px;
    margin: 0 auto;
  `,
  ProjectTitle: styled.div`
    margin: ${getSpacing(4)};
  `,
  SelectWrapper: styled.div`
    width: 500px;
  `,
};

export default Style;
