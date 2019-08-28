import React from 'react';
import { InjectedIntlProps } from 'react-intl';

import { ProjectType } from 'redux/entities/projects/types';
import ProjectMenuContent from './components/ProjectMenuContent';
import ProjectSettingsMenuContent from './components/ProjectSettingsMenuContent';
import {
  Container,
} from './Menu.style';

export interface OwnProps {
  project?: ProjectType;
  currentURL: string;
};

const PageTypes = {
  project: 'project',
  projectSettings: 'projectSettings'
}

type Props = OwnProps & InjectedIntlProps;

export const Menu: React.FunctionComponent<Props> = ({
  project,
  currentURL,
}) => {

  const [pageType, setPageType] = React.useState(PageTypes.project)

  React.useEffect(
    () => {
      if(null !== currentURL.match(/\/project\/[a-fA-F0-9-]*\/settings/)) {
        setPageType(PageTypes.projectSettings)
      } else {
        setPageType(PageTypes.project)
      };
    },
    [currentURL]
  );

  if (!project) {
    return <Container />;
  };

  switch(pageType) {
    case PageTypes.projectSettings:
      return (
        <Container>
          <ProjectSettingsMenuContent project={project} />
        </Container>
      )
      case PageTypes.project:
        return (
        <Container>
          <ProjectMenuContent project={project} />
        </Container>
      )
      default:
        return (
        <Container />
      )
  }
};
