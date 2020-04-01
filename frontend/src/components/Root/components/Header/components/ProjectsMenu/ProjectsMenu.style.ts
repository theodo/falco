import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

interface ItemWithMarginProps {
  margin?: string;
}

export const Container = styled.ul`
  width: 460px;
  max-height: 600px;
  background-color: ${colorUsage.projectsMenuBackground};
  box-shadow: 0 0 8px 4px ${colorUsage.projectsMenuShadow};
`;

export const ProjectItem = styled(Link)`
  display: flex;
  padding: ${getSpacing(3)} ${getSpacing(7)};
  margin: ${getSpacing(1)};
  text-decoration: none;
  color: ${colorUsage.projectsMenuItemText};
  font-family: ${fontFamily.mainSans};
  border-bottom: 1px solid ${colorUsage.projectsMenuItemBorder};

  &:last-child {
    border: 0;
  }

  &:hover {
    color: ${colorUsage.projectsMenuItemHoverText};
  }
`;

export const ProjectItemContainer = styled.li`
  max-height: 458px;
  overflow-y: auto;
  background-color: ${colorUsage.projectsMenuItemBackground};
`;

export const ProjectItemSnapshotContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ProjectItemSnapshot = styled.img`
  width: 75px;
  height: 50px;
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  border: 1px solid ${colorUsage.projectsMenuItemSnapshotBorder};
`;

export const ProjectItemTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 283px;
`;

export const ProjectItemTitle = styled.div`
  font-size: ${fontSize.h4Text};
  font-weight: ${fontWeight.h4Text};
  line-height: ${lineHeight.h4Text};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProjectItemLastAudit = styled.div`
  font-size: ${fontSize.bodyText};
  line-height: ${lineHeight.bodyText};
`;

export const CurrentProjectItem = styled.li`
  display: flex;
  padding: ${getSpacing(4)} ${getSpacing(8)};
  color: ${colorUsage.projectsMenuItemText};
  font-family: ${fontFamily.mainSans};
  border-bottom: 1px solid ${colorUsage.projectsMenuItemBorder};
`;

export const CurrentProjectItemSnapshot = styled.img`
  width: 150px;
  height: 100px;
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  border: 1px solid ${colorUsage.projectsMenuItemSnapshotBorder};
`;

export const CurrentProjectItemTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 198px;
`;

export const CurrentProjectItemTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
`;

export const CurrentProjectItemStarContainer = styled.div`
  min-height: 25px;
  min-width: 25px;
  height: 25px;
  width: 25px;
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
`;

export const CurrentProjectItemTitle = styled.div`
  font-size: ${fontSize.h3Text};
  font-weight: ${fontWeight.h3Text};
  line-height: ${lineHeight.h3Text};
  overflow: hidden;
  text-overflow: ellipsis;
`;
