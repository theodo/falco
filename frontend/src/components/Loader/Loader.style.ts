import styled from 'styled-components';
import { colorUsage } from 'stylesheet';

interface Props {
  color?: string;
  margin?: string;
  padding?: string;
  minHeight?: string;
}

const Style = {
  LoaderContainer: styled.div`
    width: 100%;
    height: 100%;
    min-height: ${(props: Props) => props.minHeight || '400px'};
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props: Props) => props.color || colorUsage.loader};
    padding: ${(props: Props) => props.padding || '0'};
    margin: ${(props: Props) => props.margin || '0'};
  `,
};

export default Style;
