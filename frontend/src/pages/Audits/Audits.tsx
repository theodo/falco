import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ProjectType } from 'redux/projects/types';

import { PageType } from 'redux/pages/types';
import { ScriptType } from 'redux/scripts/types';
import Style from './Audits.style';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
  pageOrScriptId: string;
}>;

export interface Props {
  project: ProjectType;
  page?: PageType;
  script?: ScriptType;
}

export const Audits: React.FunctionComponent<Props> = ({ project, page, script }) => {
  const pageOrScriptName =
    undefined !== page ? page.name : undefined !== script ? script.name : null;

  if (!pageOrScriptName) {
    return <p>No page or script configured</p>;
  }
  return (
    <Style.Audits>
      <Style.PageTitle>{project.name + ' / ' + pageOrScriptName}</Style.PageTitle>
      <Style.Dashboard>Dashboard</Style.Dashboard>
    </Style.Audits>
  );
};
