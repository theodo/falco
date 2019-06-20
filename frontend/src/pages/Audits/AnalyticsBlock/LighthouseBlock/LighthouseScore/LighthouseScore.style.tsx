// styles imported from lighthouse open source project: https://github.com/GoogleChrome/lighthouse

import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, lineHeight } from 'stylesheet';

interface ItemWithProps {
  scoreColor: string;
  score?: number;
}

export const Container = styled.div`
  font-size: ${fontSize.h4Text};
  min-height: 80px;
  margin-bottom: 8px;
`;

export const ScoreGauge = styled.div`
  max-width: 400px;
  width: auto;
  margin: 0 auto;
`;

export const GaugeWrapper = styled.div`
  color: ${(props: ItemWithProps) => props.scoreColor};
  fill: ${(props: ItemWithProps) => props.scoreColor};
  stroke: ${(props: ItemWithProps) => props.scoreColor};
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
  padding: 8px;
  contain: content;
  will-change: opacity;
`;

export const GaugeSvgWrapper = styled.div`
  position: relative;
  height: 112px;
`;

export const GaugeSvg = styled.svg`
  stroke-linecap: round;
  width: 112px;
  height: 112px;
`;

export const GaugePercentage = styled.div`
  width: 100%;
  height: 112px;
  position: absolute;
  font-family: ${fontFamily.LighthouseMono};
  font-size: ${fontSize.lighthousePercentage};
  line-height: ${lineHeight.lighthousePercentage};
  text-align: center;
  top: calc(8px + 112px / 2);
`;

export const GaugeBase = styled.circle`
  opacity: 0.1;
  stroke: ${(props: ItemWithProps) => props.scoreColor};
  stroke-width: 8px;
`;

export const GaugeArc = styled.circle`
  fill: none;
  stroke: ${(props: ItemWithProps) => props.scoreColor};
  stroke-width: 8px;
  stroke-dasharray: ${(props: ItemWithProps) => (props.score ? props.score * 352 : 352)} 352;
`;
// 352 is circonference of a circle of radius 56

export const GaugeLabel = styled.div`
  font-size: ${fontSize.lighthouseGaugeLabel};
  line-height: ${lineHeight.lighthouseGaugeLabel};
  text-align: center;
  margin-top: 14px;
  color: ${colorUsage.bodyText};
`;
