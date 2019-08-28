import { history } from 'index';
import React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { routeDefinitions } from 'routes';

import { ProjectType } from 'redux/entities/projects/types';
import {
  GoBackToProjectLink,
} from './ProjectSettingsMenuContent.style';

export interface OwnProps {
  project: ProjectType;
};

type Props = OwnProps & InjectedIntlProps;

export const ProjectSettingsMenuContent: React.FunctionComponent<Props> = ({
  project,
}) => {

  const redirectToProjectPage = () => {
    history.replace(routeDefinitions.projectDetails.path.replace(':projectId', project.uuid))
  }

  return (
    <GoBackToProjectLink onClick={redirectToProjectPage} >
      <FormattedMessage id="Menu.go_back_to_project" />
    </GoBackToProjectLink>
  );
};
