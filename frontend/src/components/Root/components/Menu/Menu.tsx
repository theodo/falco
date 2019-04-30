import React from 'react';
import { RouteComponentProps } from 'react-router';
import { ProjectType } from 'redux/projects/types';

import Style from './Menu.style';

export interface Props {
  project?: ProjectType;
}

export const Menu: React.FunctionComponent<Props> = ({ project }) => {
  if (!project) {
    return <div />;
  }
  return (
    <Style.Menu>
      <Style.ProjectName>{project.name}</Style.ProjectName>
      <Style.Audits>Audits</Style.Audits>
    </Style.Menu>
  );
};
