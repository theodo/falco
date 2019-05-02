import styled from 'styled-components';
import { colorUsage } from 'stylesheet';

interface GraphPropsType {
  index: number;
}

const Style = {
  Container: styled.div`
    margin-top: 29px;
    display: grid;
    grid-template-columns: 366px 50px 366px;
    grid-template-rows: 194px 20px 194px;
  `,

  GraphContainer: styled.div`
    grid-row-start: ${(props: GraphPropsType) => 2 * Math.floor(props.index / 2) + 1};
    grid-column-start: ${(props: GraphPropsType) => 2 * (props.index % 2) + 1};
    padding-left: 20px;
    padding-top: 5px;
    border: 1px solid ${colorUsage.graphBorder};
  `,

  LoaderContainer: styled.div`
    width: 100%;
    min-height: 400px;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.color};
  `,
};
export default Style;
