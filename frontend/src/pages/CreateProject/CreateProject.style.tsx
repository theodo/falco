import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight, settingsContainerSize } from 'stylesheet';

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0 ${getSpacing(4)} 0;
    margin: 0;
    width: ${settingsContainerSize};
  `,

  PageTitle: styled.h1`
    line-height: ${lineHeight.h1Text};
    color: ${colorUsage.h1Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h1Text};
    font-weight: ${fontWeight.h1Text};
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  Title: styled.h2`
    line-height: ${lineHeight.h2Text};
    color: ${colorUsage.h2Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h2Text};
    font-weight: ${fontWeight.h2Text};
    margin-top: ${getSpacing(6)};
`,

  SettingsFieldContainer: styled.div`
  margin-top: ${getSpacing(4)};
`,

  NextButton: styled.button`
    line-height: ${lineHeight.bodyText};
    color: ${colorUsage.bodyText};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.bodyText};
    font-weight: ${fontWeight.bodyText};
  `,

  PreviousButton: styled.button`
    line-height: ${lineHeight.bodyText};
    color: ${colorUsage.bodyText};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.bodyText};
    font-weight: ${fontWeight.bodyText};
    justify-self: start;
  `,

  NavigationButtonContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: ${getSpacing(4)};
`
};

export default Style;
