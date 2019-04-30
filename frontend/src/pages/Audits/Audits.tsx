import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ProjectType } from 'redux/projects/types';

import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { PageType } from 'redux/pages/types';
import { ScriptType } from 'redux/scripts/types';
import { colorUsage } from 'stylesheet';
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
  if (!project || (!project.pages && !project.scripts)) {
    return (
      <Style.Container>
        <Style.Error>
          <FormattedMessage id="Audits.no_page_or_script" />
        </Style.Error>
      </Style.Container>
    );
  }
  const pageOrScriptName = page ? page.name : script ? script.name : null;

  if (!pageOrScriptName) {
    return (
      <Style.Container>
        <Style.LoaderContainer color={colorUsage.loader}>
          <CircularProgress color={'inherit'} />
        </Style.LoaderContainer>
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
