import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect, RouteComponentProps } from 'react-router';
import { ProjectType } from 'redux/entities/projects/types';
import { routeDefinitions } from 'routes';

import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import { useFetchProjectIfUndefined } from 'redux/entities/projects/useFetchProjectIfUndefined';
import { Container } from './Project.style';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
}>;

type Props = {
  fetchProjectsRequest: (projectId: string) => void;
  setCurrentAuditParametersId: (auditParametersId: string | null | undefined) => void;
  setCurrentPageId: (pageId: string | null | undefined) => void;
  setCurrentScriptId: (scriptId: string | null | undefined) => void;
  setCurrentScriptStepId: (scriptStepId: string | null | undefined) => void;
  project?: ProjectType | null;
} & OwnProps;

const Project: React.FunctionComponent<Props> = ({
  fetchProjectsRequest,
  project,
  match,
  setCurrentAuditParametersId,
  setCurrentPageId,
  setCurrentScriptId,
  setCurrentScriptStepId,
}) => {
  useFetchProjectIfUndefined(fetchProjectsRequest, match.params.projectId, project);

  React.useEffect(
    () => {
      setCurrentAuditParametersId(undefined);
      setCurrentPageId(undefined);
      setCurrentScriptId(undefined);
      setCurrentScriptStepId(undefined);
    },
    [setCurrentAuditParametersId, setCurrentPageId, setCurrentScriptId, setCurrentScriptStepId],
  );

  if (project === undefined) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (project === null) {
    return (
      <Container>
        <MessagePill messageType="error">
          <FormattedMessage id="Project.project_error" />
        </MessagePill>
      </Container>
    );
  }

  let firstPageOrScriptLocation = routeDefinitions.auditsDetails.path.replace(
    ':projectId',
    project.uuid,
  );

  if (project.pagesIds.length > 0) {
    firstPageOrScriptLocation = firstPageOrScriptLocation.replace(
      ':pageOrScriptId',
      project.pagesIds[0],
    );
  } else if (project.scriptsIds.length > 0) {
    firstPageOrScriptLocation = firstPageOrScriptLocation.replace(
      ':pageOrScriptId',
      project.scriptsIds[0],
    );
  } else {
    return (
      <Container>
        <MessagePill messageType="error">
          <FormattedMessage id="Project.no_page_or_script_error" />
        </MessagePill>
      </Container>
    );
  }

  if (0 !== project.auditParametersIds.length) {
    firstPageOrScriptLocation = firstPageOrScriptLocation.replace(
      ':auditParametersId',
      project.auditParametersIds[0],
    );
  } else {
    return (
      <Container>
        <MessagePill messageType="error">
          <FormattedMessage id="Project.no_audit_parameters_error" />
        </MessagePill>
      </Container>
    );
  }
  return <Redirect to={firstPageOrScriptLocation} />;
};

export default Project;
