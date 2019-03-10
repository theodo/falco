import styled from 'styled-components';

const Style = {
  Container: styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px 100px;
    margin: 0 auto;
  `,
  ProjectTitle: styled.div`
    margin: 20px;
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
