import { MenuArrow } from 'icons';
import React from 'react';
import { ProjectType } from 'redux/projects/types';
import { routeDefinitions } from 'routes';
import { colorUsage } from 'stylesheet';

import Style from './Menu.style';

export interface Props {
  project?: ProjectType;
  currentURL: string;
}

export const Menu: React.FunctionComponent<Props> = ({ currentURL, project }) => {
  if (!project) {
    return <Style.Container />;
  }

  const pagesAndScripts = [
    ...project.pages.map(page => ({
      uuid: page.uuid,
      title: page.name,
      linkPath: routeDefinitions.auditsDetails.path
        .replace(':projectId', project.uuid)
        .replace(':pageOrScriptId', page.uuid),
      type: 'PAGE',
    })),
    ...project.scripts.map(script => ({
      uuid: script.uuid,
      title: script.name,
      linkPath: routeDefinitions.auditsDetails.path
        .replace(':projectId', project.uuid)
        .replace(':pageOrScriptId', script.uuid),
      type: 'SCRIPT',
    })),
  ];

  return (
    <Style.Container>
      <Style.ProjectName>{project.name}</Style.ProjectName>
      <Style.Audits>Audits</Style.Audits>
      {pagesAndScripts.map(pageOrScript => (
        <Style.PageScriptItem
          key={pageOrScript.uuid}
          to={pageOrScript.linkPath}
          className={currentURL === pageOrScript.linkPath ? 'active' : ''}
        >
          {pageOrScript.title}
          <Style.MenuArrowContainer>
            <MenuArrow color={currentURL === pageOrScript.linkPath ? colorUsage.menuArrowSelected : colorUsage.menuArrow} />
          </Style.MenuArrowContainer>
        </Style.PageScriptItem>
      ))}
    </Style.Container>
  );
};
