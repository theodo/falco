import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

interface ItemWithMarginProps {
  margin?: string;
}

interface ProjectsMenuContainerProps {
  position?: string;
  right?: string | null;
}

const StyledProjectsMenu = {
  Container: styled.div`
    width: 460px;
    max-height: 600px;
    background-color: ${colorUsage.projectsMenuBackground};
    box-shadow: 0 0 8px 4px ${colorUsage.projectsMenuShadow};
    position: ${(props: ProjectsMenuContainerProps) =>
      props.position ? props.position : 'static'};
    right: ${(props: ProjectsMenuContainerProps) => (props.right ? props.right : 'auto')};
  `,
  ProjectItem: styled(Link)`
    display: flex;
    padding: ${getSpacing(3)} ${getSpacing(8)};
    text-decoration: none;
    color: ${colorUsage.projectsMenuItemText};
    background-color: ${colorUsage.projectsMenuItemBackground};
    font-family: ${fontFamily.mainSans};
    border-bottom: 1px solid ${colorUsage.projectsMenuItemBorder};

    &:last-child {
      border: 0;
    }

    &:hover {
      color: ${colorUsage.projectsMenuItemHoverText};
    }
  `,
  ProjectItemContainer: styled.div`
    max-height: 458px;
    overflow-y: auto;
  `,
  ProjectItemSnapshotContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  ProjectItemSnapshot: styled.img`
    width: 75px;
    height: 50px;
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
    border: 1px solid ${colorUsage.projectsMenuItemSnapshotBorder};
  `,
  ProjectItemTitleBlock: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 283px;
  `,
  ProjectItemTitle: styled.div`
    font-size: ${fontSize.h4Text};
    font-weight: ${fontWeight.h4Text};
    line-height: ${lineHeight.h4Text};
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  ProjectItemLastAudit: styled.div`
    font-size: ${fontSize.bodyText};
    line-height: ${lineHeight.bodyText};
  `,

  CurrentProjectItem: styled.div`
    display: flex;
    padding: ${getSpacing(4)} ${getSpacing(8)};
    color: ${colorUsage.projectsMenuItemText};
    font-family: ${fontFamily.mainSans};
    border-bottom: 1px solid ${colorUsage.projectsMenuItemBorder};
  `,
  CurrentProjectItemSnapshot: styled.img`
    width: 150px;
    height: 100px;
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
    border: 1px solid ${colorUsage.projectsMenuItemSnapshotBorder};
  `,
  CurrentProjectItemTitleBlock: styled.div`
    display: flex;
    flex-direction: column;
    width: 198px;
  `,
  CurrentProjectItemTitleContainer: styled.div`
    display: flex;
    align-items: center;
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  `,
  CurrentProjectItemStarContainer: styled.div`
    min-height: 25px;
    min-width: 25px;
    height: 25px;
    width: 25px;
    margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  `,
  CurrentProjectItemTitle: styled.div`
    font-size: ${fontSize.h3Text};
    font-weight: ${fontWeight.h3Text};
    line-height: ${lineHeight.h3Text};
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};

export default StyledProjectsMenu;
