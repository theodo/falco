import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  colorUsage,
  fontFamily,
  fontSize,
  fontWeight,
  getSpacing,
  lineHeight,
} from 'stylesheet';

export const GoBackToProjectLink = styled.a`
  color: ${colorUsage.metricsSettingsText};
  font-size: ${fontSize.link};
  line-height: ${lineHeight.link};
  text-decoration: none;
  cursor: pointer;
`;

export const Settings = styled.div`
  line-height: ${lineHeight.h3Text};
  color: ${colorUsage.h3Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h3Text};
  font-weight: ${fontWeight.h3Text};
  padding: 0 ${getSpacing(3)} ${getSpacing(4)} ${getSpacing(3)};
  margin-top: ${getSpacing(4)}
`;

export const SettingsPageTitleBlock = styled.div`
  display: flex;
  align-items: center;
`;

export const SettingsPageTitle = styled.div`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MenuArrowContainer = styled.span`
  width: 12px;
  min-width: 12px;
  margin: 0;
`;

export const ProjectSettingsItem = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${getSpacing(4)} ${getSpacing(4)} ${getSpacing(4)} ${getSpacing(3)};
  text-decoration: none;
  line-height: ${lineHeight.auditLink};
  color: ${colorUsage.auditLink};
  font-size: ${fontSize.auditLink};
  font-weight: ${fontWeight.auditLink};
  border-top: 1px solid ${colorUsage.auditLinkBorder};

  &:last-child {
    border-bottom: 1px solid ${colorUsage.auditLinkBorder};
  }

  &:hover {
    color: ${colorUsage.auditLinkHoverText};
  }

  &.active {
    color: ${colorUsage.auditLinkSelectedText};
    background-color: ${colorUsage.auditLinkSelectedBackground};
    border: 1px solid ${colorUsage.auditLinkSelectedBorder};
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
