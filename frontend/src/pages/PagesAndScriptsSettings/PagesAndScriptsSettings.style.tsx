import { toasterButtonsCss } from 'pages/sharedStyle.style';
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
  ${toasterButtonsCss}
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

export const PageSubTitle = styled.h3`
  line-height: ${lineHeight.h3Text};
  color: ${colorUsage.h3Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h3Text};
  font-weight: ${fontWeight.h3Text};
  margin-top: ${getSpacing(4)};
`;

export const ProjectSettingsBlock = styled.div`
  border: solid 1px ${colorUsage.projectSettingsContainerBorder};
  margin-top: ${getSpacing(4)};
  border-radius: 3px;
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.inputText};
  line-height: ${lineHeight.inputText};
  color: ${colorUsage.inputText};
`;

export const ElementContainer = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;

  :first-child {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom: solid 1px ${colorUsage.projectSettingsContainerBorder};
    background-color: ${colorUsage.oddProjectMemberBackground};
    font-weight: bold;
  }

  :last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  :nth-child(odd) {
    background-color: ${colorUsage.oddProjectMemberBackground};
  }
`;
