import Button from 'components/Button';
import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

interface ItemWithMarginProps {
  margin?: string;
}

interface MetricInfoTooltipProps {
  top?: string;
  left?: string | null;
}

interface FullscreenProps {
  fullscreen: boolean;
}

export const MetricLegend = styled.div`
  display: flex;
  align-items: center;
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  font-family: ${fontFamily.mainSans};
`;

/* stylelint-disable */
export const LegendTitle = styled.div`
  color: ${colorUsage.graphText};
  font-size: ${(props: FullscreenProps) =>
    props.fullscreen ? fontSize.h2Text : fontSize.graphText};
  font-weight: ${(props: FullscreenProps) =>
    props.fullscreen ? fontWeight.h2Text : fontWeight.graphText};
  line-height: ${(props: FullscreenProps) =>
    props.fullscreen ? lineHeight.h2Text : lineHeight.graphText};
`;
/* stylelint-enable */

export const MetricInfoIconContainer = styled(Button)`
  width: 16px;
  height: 16px;
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
`;

export const StyledTooltip = styled.div`
  height: 52px;
  width: 147px;
  border-radius: 8px;
  background-color: ${colorUsage.graphTooltipBackground};
  box-shadow: 0 2px 4px 0 ${colorUsage.graphTooltipShadowBox};
  padding: ${getSpacing(2)} ${getSpacing(4)};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ExpandButton = styled(Button)`
  height: 20px;
  width: 20px;
  margin-left: auto;
`;

export const TooltipValue = styled.div`
  color: ${colorUsage.graphText};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.graphText};
  font-weight: ${fontWeight.graphText};
  line-height: ${lineHeight.graphText};
`;

export const TooltipDate = styled.div`
  color: ${colorUsage.graphText};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.graphText};
  line-height: ${lineHeight.graphText};
`;
