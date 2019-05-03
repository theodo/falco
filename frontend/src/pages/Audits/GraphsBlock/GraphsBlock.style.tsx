import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';

const Style = {
  Container: styled.div`
    margin-top: ${getSpacing(6)};
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  `,

  GraphContainer: styled.div`
    height: 190px;
    width: 360px;
    padding-left: ${getSpacing(4)};
    padding-top: ${getSpacing(1)};
    margin-bottom: ${getSpacing(4)};
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
