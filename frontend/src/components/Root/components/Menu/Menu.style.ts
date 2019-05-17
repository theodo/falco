import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

interface MenuArrowContainerProps {
  margin?: string;
}

const StyledMenu = {
  Container: styled.div`
    position: fixed;
    top: 100px;
    z-index: 1;
    background-color: ${colorUsage.menuBackground};
    padding-left: ${getSpacing(22)};
    padding-top: ${getSpacing(4)};
    width: 380px;
    height: 100%;
  `,

  ProjectName: styled.div`
    line-height: ${lineHeight.h2Text};
    color: ${colorUsage.h2Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h2Text};
    font-weight: ${fontWeight.h2Text};
    margin-bottom: ${getSpacing(4)};
    padding-left: ${getSpacing(3)};
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  Audits: styled.div`
    line-height: ${lineHeight.h3Text};
    color: ${colorUsage.h3Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h3Text};
    font-weight: ${fontWeight.h3Text};
    padding: ${getSpacing(4)} ${getSpacing(3)};
  `,

  PageScriptItem: styled(Link)`
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
  `,

  PageScriptTitleBlock: styled.div`
    display: flex;
    align-items: center;
  `,

  PageScriptTitle: styled.div`
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  MenuArrowContainer: styled.span`
    width: 12px;
    min-width: 12px;
    margin: ${(props: MenuArrowContainerProps) => (props.margin ? props.margin : '0')};
  `,
};

export default StyledMenu;
