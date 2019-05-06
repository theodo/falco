import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

interface ItemWithMarginProps {
  margin?: string;
}

const Style = {
  Container: styled.div`
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
    display: flex;
    flex-direction: column;
  `,

  LoaderContainer: styled.div`
    width: 100%;
    min-height: 400px;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.color};
  `,

  Error: styled.div`
    padding: ${getSpacing(3)};
    color: ${colorUsage.popinErrorText};
    background-color: ${colorUsage.popinErrorBackground};
    border-radius: ${getSpacing(1)};
    margin: ${getSpacing(8)};
    white-space: pre-wrap;
  `,

  SubTitle: styled.div`
    line-height: ${lineHeight.h3Text};
    color: ${colorUsage.h3Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h3Text};
    font-weight: ${fontWeight.h3Text};
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  `,

  WebPageTestButton: styled.a`
    width: 170px;
    padding: ${getSpacing(2)} ${getSpacing(0)};
    align-self: flex-end;
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
  `,
};
export default Style;
