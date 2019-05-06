import Badge from 'components/Badge';
import { MenuArrow } from 'icons';
import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { ProjectType } from 'redux/projects/types';
import { routeDefinitions } from 'routes';
import { colorUsage, getSpacing } from 'stylesheet';

import Style from './Menu.style';

export interface PageOrScript {
  uuid: string;
  title: string;
  linkPath: string;
  type: string;
}

export interface OwnProps {
  project?: ProjectType;
  currentURL: string;
}

type Props = OwnProps & InjectedIntlProps;

export const Menu: React.FunctionComponent<Props> = ({ currentURL, intl, project }) => {
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

  const getBadgeParams = (pageOrScript: PageOrScript) => {
    if ('PAGE' === pageOrScript.type) {
      const badgeText = intl.formatMessage({ id: `Menu.page_badge` });
      if (currentURL === pageOrScript.linkPath) {
        return {
          backgroundColor: colorUsage.pageBadgeSelectedBackground,
          color: colorUsage.pageBadgeSelectedText,
          text: badgeText,
        };
      } else {
        return {
          backgroundColor: colorUsage.pageBadgeBackground,
          color: colorUsage.pageBadgeText,
          text: badgeText,
        };
      }
    } else if ('SCRIPT' === pageOrScript.type) {
      const badgeText = intl.formatMessage({ id: `Menu.script_badge` });
      if (currentURL === pageOrScript.linkPath) {
        return {
          backgroundColor: colorUsage.scriptBadgeSelectedBackground,
          color: colorUsage.scriptBadgeSelectedText,
          text: badgeText,
        };
      } else {
        return {
          backgroundColor: colorUsage.scriptBadgeBackground,
          color: colorUsage.scriptBadgeText,
          text: badgeText,
        };
      }
    }
    return {
      backgroundColor: '',
      color: '',
      text: '',
    };
  };

  return (
    <Style.Container>
      <Style.ProjectName>{project.name}</Style.ProjectName>
      <Style.Audits>Audits</Style.Audits>
      {pagesAndScripts.map((pageOrScript: PageOrScript) => {
        const badgeParams = getBadgeParams(pageOrScript);
        return (
          <Style.PageScriptItem
            key={pageOrScript.uuid}
            to={pageOrScript.linkPath}
            className={currentURL === pageOrScript.linkPath ? 'active' : ''}
          >
            <Style.PageScriptTitleBlock>
              <Style.PageScriptTitle>{pageOrScript.title}</Style.PageScriptTitle>
              {pageOrScript.type && (
                <Badge
                  backgroundColor={badgeParams.backgroundColor}
                  color={badgeParams.color}
                  margin={`0 0 0 ${getSpacing(4)}`}
                  text={badgeParams.text}
                />
              )}
            </Style.PageScriptTitleBlock>
            <Style.MenuArrowContainer margin={`0 0 0 ${getSpacing(4)}`}>
              <MenuArrow
                color={
                  currentURL === pageOrScript.linkPath
                    ? colorUsage.menuArrowSelected
                    : colorUsage.menuArrow
                }
              />
            </Style.MenuArrowContainer>
          </Style.PageScriptItem>
        );
      })}
    </Style.Container>
  );
};
