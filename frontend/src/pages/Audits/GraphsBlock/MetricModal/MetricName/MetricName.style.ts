import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, lineHeight } from 'stylesheet';

const Style = {
  MetricContainer: styled.div``,
  MetricName: styled.div`
    color: ${colorUsage.labelText};
    font-size: ${fontSize.labelText};
    line-height: ${lineHeight.labelText};
    font-family: ${fontFamily.mainSans};
    cursor: pointer;
  `,
};

export default Style;
