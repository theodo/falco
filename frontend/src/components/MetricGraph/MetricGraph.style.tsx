import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

interface ItemWithMarginProps {
  margin?: string;
}

interface MetricInfoTooltipProps {
  top?: string;
  left?: string | null;
}

const Style = {
  Legend: styled.div`
    display: flex;
    align-items: center;
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
    font-family: ${fontFamily.mainSans};
  `,
  LegendTitle: styled.div`
    color: ${colorUsage.graphText};
    font-size: ${fontSize.graphText};
    font-weight: ${fontWeight.graphText};
    line-height: ${lineHeight.graphText};
  `,

  MetricInfoIconContainer: styled.div`
    width: 16px;
    height: 16px;
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
    cursor: pointer;
  `,

  MetricInfoTooltip: styled.div`
    position: absolute;
    top: ${(props: MetricInfoTooltipProps) => (props.top ? props.top : 'auto')};
    left: ${(props: MetricInfoTooltipProps) => (props.left ? props.left : 'auto')};
    width: 200px;
    border-radius: 5px;
    background-color: ${colorUsage.metricInformationTooltipBackground};
    box-shadow: 0 2px 4px 0 ${colorUsage.metricInformationTooltipShadowBox};
    padding: ${getSpacing(2)} ${getSpacing(3)};
    color: ${colorUsage.metricInformationTooltipText};
    font-size: ${fontSize.metricInformationTooltip};
    line-height: ${lineHeight.metricInformationTooltip};
    font-weight: ${fontWeight.metricInformationTooltip};
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
