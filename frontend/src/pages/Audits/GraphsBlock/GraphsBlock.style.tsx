import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, getSpacing, lineHeight } from 'stylesheet';

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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  `,

  ChooseMetricsButton: styled.button`
    color: ${colorUsage.metricsSettingsText};
    font-size: ${fontSize.link};
    line-height: ${lineHeight.link};
    font-family: ${fontFamily.mainSans};
    background: none;
    border: none;
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
    padding: 0;
    cursor: pointer;

    &:active {
      outline: none;
    }
    &:focus {
      outline: none;
    }
  `,

  GraphInfoLink: styled.a`
    color: ${colorUsage.metricsSettingsText};
    font-size: ${fontSize.link};
    line-height: ${lineHeight.link};
    text-decoration: none;
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  `,
};

export default Style;
