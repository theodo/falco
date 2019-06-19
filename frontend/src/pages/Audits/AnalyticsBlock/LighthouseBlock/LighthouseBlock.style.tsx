import styled from 'styled-components';
import {
  colorUsage,
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  getSpacing,
  lineHeight,
} from 'stylesheet';

interface ItemWithMarginProps {
  margin?: string;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SubTitle = styled.div`
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  line-height: ${lineHeight.h3Text};
  color: ${colorUsage.h3Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h3Text};
  font-weight: ${fontWeight.h3Text};
`;

export const LighthouseNote = styled.div`
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  color: ${colorUsage.bodyText};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.bodyText};
  font-style: ${fontStyle.lighthouseNote};
  line-height: ${lineHeight.bodyText};
`;

