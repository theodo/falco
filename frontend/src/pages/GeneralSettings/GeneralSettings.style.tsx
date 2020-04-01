import styled from 'styled-components';
import {
  colorUsage,
  fontFamily,
  fontSize,
  fontWeight,
  getSpacing,
  lineHeight,
  settingsContainerSize,
} from 'stylesheet';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 ${getSpacing(4)} 0;
  margin: 0;
  width: ${settingsContainerSize};
`;

export const PageTitle = styled.h1`
  line-height: ${lineHeight.h1Text};
  color: ${colorUsage.h1Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h1Text};
  font-weight: ${fontWeight.h1Text};
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Title = styled.h2`
  line-height: ${lineHeight.h2Text};
  color: ${colorUsage.h2Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h2Text};
  font-weight: ${fontWeight.h2Text};
  margin-top: ${getSpacing(6)};
`;

export const SettingsFieldContainer = styled.div`
  margin-top: ${getSpacing(4)};
`;

export const ExplanationText = styled.span`
  margin-top: ${getSpacing(4)};
  line-height: ${lineHeight.bodyText};
  color: ${colorUsage.bodyText};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.bodyText};
  font-weight: ${fontWeight.bodyText};
`;
