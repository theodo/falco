import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

interface MetricTooltipProps {
  top?: string;
  left?: string | null;
}

const Style = {
  Container: styled.div`
    position: absolute;
    top: ${(props: MetricTooltipProps) => (props.top ? props.top : 'auto')};
    left: ${(props: MetricTooltipProps) => (props.left ? props.left : 'auto')};
    width: 200px;
    border-radius: 5px;
    background-color: ${colorUsage.metricInformationTooltipBackground};
    box-shadow: 0 2px 4px 0 ${colorUsage.metricInformationTooltipShadowBox};
    padding: ${getSpacing(2)} ${getSpacing(3)};
    color: ${colorUsage.metricInformationTooltipText};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.metricInformationTooltip};
    line-height: ${lineHeight.metricInformationTooltip};
    font-weight: ${fontWeight.metricInformationTooltip};
  `,
};
export default Style;
