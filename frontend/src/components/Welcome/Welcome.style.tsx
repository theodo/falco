import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

export const WelcomeBlockContainer = styled.div`
  margin: 0 200px;
`;

export const WelcomeBlockTitle = styled.h1`
  line-height: ${lineHeight.h1Text};
  color: ${colorUsage.h1Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h1Text};
  font-weight: ${fontWeight.h1Text};
  margin-top: ${getSpacing(4)};
  margin-bottom: ${getSpacing(12)};
`;

export const WelcomeBlockText = styled.div`
  line-height: ${lineHeight.introductionText};
  color: ${colorUsage.introductionText};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.introductionText};
`;

export const WelcomeBlockTextParagraph = styled.p`
  margin-bottom: ${getSpacing(8)};
`;
