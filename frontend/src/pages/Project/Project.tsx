import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { Redirect, RouteComponentProps } from 'react-router';
import { ProjectType } from 'redux/projects/types';
import { routeDefinitions } from 'routes';

import ErrorMessage from 'components/ErrorMessage';
import Loader from 'components/Loader';
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
        <Loader />
      </Style.Container>
    );
  }

  if (project === null) {
    return (
      <Style.Container>
        <ErrorMessage>
          <FormattedMessage id="Project.project_error" />
        </ErrorMessage>
      </Style.Container>
    );
  }

  let firstPageOrScriptLocation = routeDefinitions.auditsDetails.path.replace(
    ':projectId',
    project.uuid,
  );

  if (project.pages.length > 0) {
    firstPageOrScriptLocation = firstPageOrScriptLocation.replace(
      ':pageOrScriptId',
      project.pages[0].uuid,
    );
  } else if (project.scripts.length > 0) {
    firstPageOrScriptLocation = firstPageOrScriptLocation.replace(
      ':pageOrScriptId',
      project.scripts[0].uuid,
    );
  } else {
    return (
      <Style.Container>
        <ErrorMessage>
          <FormattedMessage id="Project.no_page_or_script_error" />
        </ErrorMessage>
      </Style.Container>
    );
  }
  return <Redirect to={firstPageOrScriptLocation} />;
};

export default Project;
