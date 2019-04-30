import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ProjectType } from 'redux/projects/types';

import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { PageType } from 'redux/pages/types';
import { ScriptType } from 'redux/scripts/types';
import Style from './Audits.style';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
  pageOrScriptId: string;
}>;

type Props = {
  project?: ProjectType;
  page?: PageType;
  script?: ScriptType;
} & InjectedIntlProps;

export const Audits: React.FunctionComponent<Props> = ({ project, page, script }) => {
  const pageOrScriptName = page ? page.name : script ? script.name : null;
  if (!pageOrScriptName || !project) {
    return (
      <Style.Container>
        <Style.Error>
          <FormattedMessage id="Audits.no_page_or_script" />
        </Style.Error>
      </Style.Container>
    );
  }

  return (
    <Style.Container>
      <Style.PageTitle>{project.name + ' / ' + pageOrScriptName}</Style.PageTitle>
      <Style.Dashboard>Dashboard</Style.Dashboard>
    </Style.Container>
  );
};
