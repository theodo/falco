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

export const LighthouseLink = styled.a`
  width: 170px;
  padding: ${getSpacing(2)} ${getSpacing(0)};
  align-self: center;
  border-radius: 6px;
  color: ${colorUsage.webPageTestLinkButtonText};
  background-color: ${colorUsage.webPageTestLinkButtonBackground};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.webPageTestLink};
  font-weight: ${fontWeight.webPageTestLink};
  line-height: ${lineHeight.webPageTestLink};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
