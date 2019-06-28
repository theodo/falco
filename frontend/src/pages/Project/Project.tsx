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
  setCurrentAuditParametersId: (auditParametersId: string | null | undefined) => void;
  setCurrentPageId: (pageId: string | null | undefined) => void;
  setCurrentScriptId: (scriptId: string | null | undefined) => void;
  setCurrentScriptStepId: (scriptStepId: string | null | undefined) => void;
  project?: ProjectType;
} & OwnProps &
  InjectedIntlProps;

const Project: React.FunctionComponent<Props> = ({
  fetchProjectRequest,
  project,
  match,
  setCurrentAuditParametersId,
  setCurrentPageId,
  setCurrentScriptId,
  setCurrentScriptStepId,
}) => {
  React.useEffect(
    () => {
      setCurrentAuditParametersId(undefined);
      setCurrentPageId(undefined);
      setCurrentScriptId(undefined);
      setCurrentScriptStepId(undefined);
      fetchProjectRequest(match.params.projectId);
    },
    [
      match.params.projectId,
      fetchProjectRequest,
      setCurrentAuditParametersId,
      setCurrentPageId,
      setCurrentScriptId,
      setCurrentScriptStepId,
    ],
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

  if (0 !== project.auditParametersList.length) {
    firstPageOrScriptLocation = firstPageOrScriptLocation.replace(
      ':auditParametersId',
      project.auditParametersList[0].uuid,
    );
  } else {
    return (
      <Style.Container>
        <ErrorMessage>
          <FormattedMessage id="Project.no_audit_parameters_error" />
        </ErrorMessage>
      </Style.Container>
    );
  }
  return <Redirect to={firstPageOrScriptLocation} />;
};

export default Project;
