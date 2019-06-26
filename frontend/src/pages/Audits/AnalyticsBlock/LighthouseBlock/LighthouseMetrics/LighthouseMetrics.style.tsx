// styles imported from lighthouse open source project: https://github.com/GoogleChrome/lighthouse

import styled from 'styled-components';
import { colorUsage, fontSize, fontWeight } from 'stylesheet';

interface ItemWithProps {
  state: 'FAIL' | 'AVERAGE' | 'PASS';
}

const iconColor = (state: 'FAIL' | 'AVERAGE' | 'PASS'): string => {
  switch (state) {
    case 'FAIL':
      return colorUsage.lighthouseFail;
    case 'AVERAGE':
      return colorUsage.lighthouseAverage;
    case 'PASS':
      return colorUsage.lighthousePass;
  }
};

const textColor = (state: 'FAIL' | 'AVERAGE' | 'PASS'): string => {
  switch (state) {
    case 'FAIL':
      return colorUsage.lighthouseFailSecondary;
    case 'AVERAGE':
      return colorUsage.lighthouseAverageSecondary;
    case 'PASS':
      return colorUsage.lighthousePassSecondary;
  }
};

export const MetricsContainer = styled.div`
  position: relative;
`;

export const MetricsHeader = styled.div`
  display: flex;
  width: 100%;
  font-size: ${fontSize.lighthouseMetricsHeader};
  font-weight: ${fontWeight.lighthouseMetricsHeader};
  margin: 0 0 8px;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const Column = styled.div`
  flex: 1;

  &:first-child {
    margin-right: 24px;
  }
`;

export const Metric = styled.div`
  border-bottom: 1px solid ${colorUsage.lighthouseLineColor};

  &:first-child {
    border-top: 1px solid ${colorUsage.lighthouseLineColor};
  }
`;

export const MetricInnerwrap = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 0;

  &::before {
    content: '';
    display: inline-block;
    margin: 0 12px 0 4px;
    border-radius: ${(props: ItemWithProps) => (props.state === 'PASS' ? '100%' : '')};
    background: ${(props: ItemWithProps) =>
      props.state === 'PASS'
        ? iconColor(props.state)
        : props.state === 'AVERAGE'
        ? iconColor(props.state)
        : ''};
    width: ${(props: ItemWithProps) =>
      props.state === 'PASS' ? '12px' : props.state === 'AVERAGE' ? 'calc(12px * 0.88)' : ''};
    height: ${(props: ItemWithProps) =>
      props.state === 'PASS' ? '12px' : props.state === 'AVERAGE' ? 'calc(12px * 0.88)' : ''};
    border-left: ${(props: ItemWithProps) =>
      props.state === 'FAIL' ? '6px solid transparent' : ''};
    border-right: ${(props: ItemWithProps) =>
      props.state === 'FAIL' ? '6px solid transparent' : ''};
    border-bottom: ${(props: ItemWithProps) =>
      props.state === 'FAIL' ? '12px solid ' + iconColor(props.state) : ''};
  }
`;

export const MetricTitle = styled.span`
  flex: 1;
`;

export const MetricValue = styled.div`
  white-space: nowrap;
  color: ${(props: ItemWithProps) => textColor(props.state)};
`;
