import { Link } from 'react-router-dom';
import { StatusType } from 'redux/projects/types';
import styled from 'styled-components';
import {
  colorUsage,
  fontFamily,
  fontSize,
  fontWeight,
  getSpacing,
  lineHeight,
  zIndex,
} from 'stylesheet';

interface MenuArrowContainerProps {
  margin?: string;
}

interface AuditStatusHistoryIconProps {
  status: StatusType;
}

export const Container = styled.div`
  position: fixed;
  top: 100px;
  z-index: ${zIndex.menu};
  background-color: ${colorUsage.menuBackground};
  padding-left: ${getSpacing(22)};
  padding-top: ${getSpacing(4)};
  width: 380px;
  height: 100%;
`;

export const ProjectName = styled.div`
  line-height: ${lineHeight.h2Text};
  color: ${colorUsage.h2Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h2Text};
  font-weight: ${fontWeight.h2Text};
  margin-bottom: ${getSpacing(4)};
  padding: 0 ${getSpacing(3)};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AuditParametersBlock = styled.div`
  margin-bottom: ${getSpacing(4)};
  padding: 0 ${getSpacing(3)};
  display: flex;
  flex-direction: column;
`;

export const AuditParametersTitle = styled.div`
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.labelText};
  line-height: ${lineHeight.labelText};
  font-weight: ${fontWeight.labelText};
  color: ${colorUsage.labelText};
  margin-bottom: ${getSpacing(2)};
`;

export const Audits = styled.div`
  line-height: ${lineHeight.h3Text};
  color: ${colorUsage.h3Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h3Text};
  font-weight: ${fontWeight.h3Text};
  padding: 0 ${getSpacing(3)} ${getSpacing(4)} ${getSpacing(3)};
`;

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

export const MenuArrowContainer = styled.span`
  width: 12px;
  min-width: 12px;
  margin: ${(props: MenuArrowContainerProps) => (props.margin ? props.margin : '0')};
`;

/* stylelint-disable */
// stylelint is blocking commit with background-color for no reason
export const AuditStatusHistoryIcon = styled.span`
  height: 12px;
  width: 12px;
  margin-right: 5px;
  background-color: ${(props: AuditStatusHistoryIconProps) => {
    switch (props.status) {
      case "SUCCESS":
        return colorUsage.auditStatusHistoryIconSuccess;
      case "PENDING":
        return colorUsage.auditStatusHistoryIconPending;
      case "REQUESTED":
        return colorUsage.auditStatusHistoryIconPending;
      case "ERROR":
        return colorUsage.auditStatusHistoryIconFailure;
      default:
        return colorUsage.auditStatusHistoryIconFailure;
    }
  }
  };
  border-radius: 50%;
  display: inline-block;
`;
/* stylelint-enable */


export const AuditStatusHistoryIconContainer = styled.div`
  min-width: 20px;
  height: 100%;
  display:flex;
  align-items: center;
`;
