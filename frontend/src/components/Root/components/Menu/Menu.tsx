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

type Props = OwnProps & InjectedIntlProps;

export const Menu: React.FunctionComponent<Props> = ({
  project,
  currentURL,
}) => {

  const [isSettingsPage, setSettingsPage] = React.useState(false)

  React.useEffect(
    () => {
      setSettingsPage(null !== currentURL.match(/\/project\/[a-fA-F0-9-]*\/settings/));
    },
    [currentURL]
  );

  if (!project) {
    return <Container />;
  };

  return (
    <Container>
      {isSettingsPage && <ProjectSettingsMenuContent project={project} />}

      {!isSettingsPage && <ProjectMenuContent project={project}/>}
    </Container>
  );
};
