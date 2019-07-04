import { Link } from 'react-router-dom';
import { StatusType } from "redux/entities/auditStatusHistories/types";
import styled from "styled-components";
import { colorUsage, fontSize, fontWeight, getSpacing, lineHeight } from "stylesheet";

interface AuditStatusHistoryIconProps {
  status: StatusType;
};

interface MenuArrowContainerProps {
  margin?: string;
};

export const PageScriptItem = styled(Link)`
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

export const PageScriptTitleBlock = styled.div`
  display: flex;
  align-items: center;
`;

export const PageScriptTitle = styled.div`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const COLOR_BY_STATUS = {
  "SUCCESS": colorUsage.auditStatusHistoryIconSuccess,
  "PENDING": colorUsage.auditStatusHistoryIconPending,
  "REQUESTED": colorUsage.auditStatusHistoryIconPending,
  "ERROR": colorUsage.auditStatusHistoryIconFailure,
};

export const AuditStatusHistoryIcon = styled.span<AuditStatusHistoryIconProps>`
    cursor: help;
    height: 12px;
    width: 12px;
    margin-right: 5px;
    background-color: ${(props) => COLOR_BY_STATUS[props.status]};
    border-radius: 50%;
    display: inline-block;
`;

export const AuditStatusHistoryIconContainer = styled.div`
  min-width: 20px;
  height: 100%;
  display:flex;
  align-items: center;
`;

export const MenuArrowContainer = styled.span`
  width: 12px;
  min-width: 12px;
  margin: ${(props: MenuArrowContainerProps) => (props.margin ? props.margin : '0')};
`;
