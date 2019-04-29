import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { Redirect, RouteComponentProps } from 'react-router';
import { ProjectType } from 'redux/projects/types';
import { colorUsage } from 'stylesheet';

import Style from './Project.style';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
}>;

type Props = {
  fetchProjectRequest: (projectId: string) => void;
  project?: ProjectType;
} & OwnProps &
  InjectedIntlProps;

const Project: React.FunctionComponent<Props> = props => {
  const { fetchProjectRequest, project, match } = props;
  React.useEffect(
    () => {
      fetchProjectRequest(match.params.projectId);
    },
    [match.params.projectId],
  );

  if (project === undefined) {
    return (
      <Style.Container>
        <Style.LoaderContainer color={colorUsage.loader}>
          <CircularProgress color={'inherit'} />
        </Style.LoaderContainer>
      </Style.Container>
    );
  }

  if (project === null) {
    return (
      <Style.Container>
        <Style.Error>
          <FormattedMessage id="Project.project_error" />
        </Style.Error>
      </Style.Container>
    );
  }

  let firstPageOrScriptLocation = window.location.pathname + '/audits/';
  if (project.pages.length > 0) {
    firstPageOrScriptLocation += project.pages[0].uuid;
  } else if (project.scripts.length > 0) {
    firstPageOrScriptLocation += project.scripts[0].uuid;
  }
  return <Redirect to={firstPageOrScriptLocation} />;
};

export default Project;
