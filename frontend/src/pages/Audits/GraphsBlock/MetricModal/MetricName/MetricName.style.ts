import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, lineHeight } from 'stylesheet';

export const MetricContainer = styled.div``;

export const MetricName = styled.div`
  color: ${colorUsage.labelText};
  font-size: ${fontSize.labelText};
  line-height: ${lineHeight.labelText};
  font-family: ${fontFamily.mainSans};
  cursor: pointer;
`;
