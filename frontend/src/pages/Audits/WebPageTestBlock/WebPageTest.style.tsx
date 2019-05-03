import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

const Style = {
  Container: styled.div`
    margin-bottom: ${getSpacing(8)};
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
    margin-bottom: ${getSpacing(4)};
  `,

  WebPageTestButton: styled.a`
    width: 170px;
    padding: ${getSpacing(2)} ${getSpacing(0)};
    align-self: flex-end;
    border-radius: 6px;
    color: ${colorUsage.webPageTestLinkButtonText};
    background-color: ${colorUsage.webPageTestLinkButtonBackground};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.link};
    font-weight: ${fontWeight.linkText};
    line-height: ${lineHeight.linkText};
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
export default Style;
