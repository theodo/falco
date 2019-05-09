import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

interface ItemWithMarginProps {
  margin?: string;
}

const Style = {
  Container: styled.div`
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
    width: 100%;
    display: flex;
    flex-direction: column;
  `,

  Title: styled.div`
    line-height: ${lineHeight.h2Text};
    color: ${colorUsage.h2Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h2Text};
    font-weight: ${fontWeight.h2Text};
    margin-bottom: ${getSpacing(4)};
  `,
};

export default Style;
