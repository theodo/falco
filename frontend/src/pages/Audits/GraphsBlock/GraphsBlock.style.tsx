import styled from 'styled-components';
import { colorUsage, fontSize, getSpacing, lineHeight } from 'stylesheet';

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
    width: 380px;
    padding-top: ${getSpacing(1)};
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
    border: 1px solid ${colorUsage.graphBorder};
  `,

  GraphSettingsContainer: styled.div`
    height: 190px;
    width: 380px;
    display: flex;
    align-items: center;
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  `,

  GraphInfoLink: styled.a`
    color: ${colorUsage.pickRightMetricsLinkText};
    font-size: ${fontSize.link};
    line-height: ${lineHeight};
    text-decoration: none;
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  `,
};
export default Style;
