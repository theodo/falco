import { history } from 'index';
import React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { routeDefinitions } from 'routes';

import { MenuArrow } from 'icons';
import { ProjectType } from 'redux/entities/projects/types';
import { colorUsage, getSpacing } from 'stylesheet';
import {
  Container,
  GoBackToProjectLink,
  MenuArrowContainer,
  ProjectSettingsItem,
  Settings,
  SettingsPageTitle,
  SettingsPageTitleBlock,
} from './ProjectSettingsMenuContent.style';

export interface OwnProps {
  project: ProjectType;
};

type Props = {
  currentURL: string;
} & OwnProps & InjectedIntlProps;

export const ProjectSettingsMenuContent: React.FunctionComponent<Props> = ({
  project,
  currentURL,
  intl,
}) => {

  const settingPages = [
    routeDefinitions.projectSettingsGeneral,
    routeDefinitions.environmentSettings,
    routeDefinitions.pagesAndScriptsSettings,
    routeDefinitions.membersSettings,
  ]

  const linkPathMatchesUrl = (page: any) => {
    const pageURL = page.path.replace(':projectId', project.uuid);
    return pageURL.startsWith(currentURL)
  }


  const projectPageUrl = routeDefinitions.projectDetails.path.replace(':projectId', project.uuid)

  return (
    <Container>
      <GoBackToProjectLink to={projectPageUrl}>
        <FormattedMessage id="Menu.go_back_to_project" />
      </GoBackToProjectLink>
      <Settings>{intl.formatMessage({ id: 'Menu.project_settings'})}</Settings>
        {settingPages.map((page) =>
          <ProjectSettingsItem
            key={page.path}
            to={page.path.replace(':projectId', project.uuid)}
            className={
              linkPathMatchesUrl(page) ? 'active' : ''
            }
          >
            <SettingsPageTitleBlock>
                <SettingsPageTitle>{intl.formatMessage({id: page.id ? page.id : ''})}</SettingsPageTitle>
            </SettingsPageTitleBlock>
            <MenuArrowContainer margin={`0 0 0 ${getSpacing(4)}`} height="20px">
              <MenuArrow
                color={
                  linkPathMatchesUrl(page)
                    ? colorUsage.menuArrowSelected
                    : colorUsage.menuArrow
                }
                height="20px"
                width="20px"
              />
            </MenuArrowContainer>
          </ProjectSettingsItem>
        )}
    </Container>
  );
};
