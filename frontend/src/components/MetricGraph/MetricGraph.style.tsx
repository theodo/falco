import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

interface ItemWithMarginProps {
  margin?: string;
}

const Style = {
  Legend: styled.div`
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
    color: ${colorUsage.graphText};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.graphText};
    font-weight: ${fontWeight.graphText};
    line-height: ${lineHeight.graphText};
  `,

  Tooltip: styled.div`
    height: 52px;
    width: 147px;
    border-radius: 8px;
    background-color: ${colorUsage.graphTooltipBackground};
    box-shadow: 0 2px 4px 0 ${colorUsage.graphTooltipShadowBox};
    padding: ${getSpacing(2)} ${getSpacing(4)};
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,

  TooltipValue: styled.div`
    color: ${colorUsage.graphText};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.graphText};
    font-weight: ${fontWeight.graphText};
    line-height: ${lineHeight.graphText};
  `,

  TooltipDate: styled.div`
    color: ${colorUsage.graphText};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.graphText};
    line-height: ${lineHeight.graphText};
  `,
};
export default Style;
