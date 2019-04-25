import styled from 'styled-components';
import { getSpacing } from 'stylesheet';

const Style = {
  Container: styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: ${getSpacing(4)} ${getSpacing(20)};
    margin: 0 auto;
  `,
  ProjectTitle: styled.div`
    margin: ${getSpacing(4)};
  `,
  ProjectTiles: styled.div`
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-between;
    width: 100%;
  `,
};

export default Style;
