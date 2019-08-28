import styled from 'styled-components';
import {
  colorUsage,
  fontSize,
  lineHeight,
} from 'stylesheet';

export const GoBackToProjectLink = styled.a`
  color: ${colorUsage.metricsSettingsText};
  font-size: ${fontSize.link};
  line-height: ${lineHeight.link};
  text-decoration: none;
  cursor: pointer;
`;
