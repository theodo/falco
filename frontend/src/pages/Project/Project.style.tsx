import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
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
  Error: styled.div`
    padding: ${getSpacing(3)};
    color: ${colorUsage.popinErrorText};
    background-color: ${colorUsage.popinErrorBackground};
    border-radius: ${getSpacing(1)};
    margin: ${getSpacing(8)};
    white-space: pre-wrap;
  `,
};

export default Style;
