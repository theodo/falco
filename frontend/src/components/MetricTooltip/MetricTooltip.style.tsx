import styled from 'styled-components';
import {
  colorUsage,
  fontFamily,
  fontSize,
  fontWeight,
  getSpacing,
  lineHeight,
  zIndex,
} from 'stylesheet';

interface MetricTooltipProps {
  top?: string | null;
  left?: string | null;
}

export const Container = styled.div`
  position: absolute;
  top: ${(props: MetricTooltipProps) => (props.top ? props.top : 'auto')};
  left: ${(props: MetricTooltipProps) => (props.left ? props.left : 'auto')};
  width: 200px;
  border-radius: 5px;
  background-color: ${colorUsage.metricTooltipBackground};
  box-shadow: 0 2px 4px 0 ${colorUsage.metricTooltipShadowBox};
  padding: ${getSpacing(2)} ${getSpacing(3)};
  color: ${colorUsage.metricTooltipText};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.metricTooltip};
  line-height: ${lineHeight.metricTooltip};
  font-weight: ${fontWeight.metricTooltip};
  z-index: ${zIndex.tooltip};
`;

