import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, lineHeight } from 'stylesheet';

const Style = {
  Legend: styled.div`
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
    background-color: ${colorUsage.tooltipBackground};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    padding: 10px 19px;
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
