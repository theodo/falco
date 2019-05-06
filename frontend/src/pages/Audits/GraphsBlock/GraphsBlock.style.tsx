import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';

interface ItemWithMarginProps {
  margin?: string;
}

const Style = {
  Container: styled.div`
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
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
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
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
