import Select from 'components/Select';
import { history } from 'index';
import React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { ValueType } from 'react-select/lib/types';
import { routeDefinitions } from 'routes';

import MessagePill from 'components/MessagePill';
import MenuPageScriptItem from 'components/Root/components/MenuPageScriptItem';
import { AuditParametersType } from 'redux/entities/auditParameters/types';
import { ProjectType } from 'redux/entities/projects/types';
import { UserState } from 'redux/user';
import { isUserAdminOfProject } from 'services/utils';
import { getSpacing } from 'stylesheet';
import {
  AuditParametersBlock,
  AuditParametersTitle,
  Audits,
  AuditsAndScriptsContainer,
  Container,
  LaunchAuditsButton,
  ProjectName,
  ProjectSettingsLink,
} from './ProjectMenuContent.style';

interface AuditParametersOption {
  value: string;
  label: string;
}

export interface OwnProps {
  user: UserState;
  auditParametersId: string | null;
  currentPageId: string | null;
  project: ProjectType;
  auditParametersList: AuditParametersType[];
  currentScriptId: string | null;
  scriptStepId: string | null;
  runningAudits: string[];
  launchAudits: (projectId: string) => void;
}

type Props = OwnProps & InjectedIntlProps;

export const ProjectMenuContent: React.FunctionComponent<Props> = ({
  user,
  auditParametersId,
  currentPageId,
  project,
  auditParametersList,
  currentScriptId,
  scriptStepId,
  runningAudits,
  launchAudits,
}) => {
  const [auditCanBeLaunched, setAuditCanBeLaunched] = React.useState(true);

  const auditParametersSelectOptions = auditParametersList.map(auditParameters => ({
    value: auditParameters.uuid,
    label: auditParameters.name,
  }));

  const handleAuditParametersSelection = (
    selectedOption: ValueType<AuditParametersOption | {}>,
  ) => {
    // Check needed to avoid TS2339 error
    if (selectedOption && 'value' in selectedOption && auditParametersId) {
      if (currentPageId) {
        history.push(
          routeDefinitions.auditsDetails.path
            .replace(':projectId', project.uuid)
            .replace(':pageOrScriptId', currentPageId)
            .replace(':auditParametersId', selectedOption.value),
        );
      } else if (currentScriptId) {
        if (!scriptStepId) {
          history.push(
            routeDefinitions.auditsDetails.path
              .replace(':projectId', project.uuid)
              .replace(':pageOrScriptId', currentScriptId)
              .replace(':auditParametersId', selectedOption.value),
          );
        } else {
          history.push(
            routeDefinitions.auditsScriptDetails.path
              .replace(':projectId', project.uuid)
              .replace(':pageOrScriptId', currentScriptId)
              .replace(':auditParametersId', selectedOption.value)
              .replace(':scriptStepId', scriptStepId),
          );
        }
      }
    }
  };

  return (
    <Container>
      <ProjectName>{project.name}</ProjectName>

      {runningAudits.length === 0 && auditCanBeLaunched ? (
        <LaunchAuditsButton
          onClick={() => {
            setAuditCanBeLaunched(false);
            launchAudits(project.uuid);
            // wait 1 second before it is possible to launch another audit
            // this is intended to stop several audits being launched at once
            setTimeout(() => setAuditCanBeLaunched(true), 1000);
          }}
        >
          <FormattedMessage id="Menu.launch_audits" />
        </LaunchAuditsButton>
      ) : runningAudits.length !== 0 ? (
        <MessagePill messageType="info" margin={getSpacing(3)}>
          <FormattedMessage
            id="Menu.running_audits_number"
            values={{ number: runningAudits.length }}
          />
        </MessagePill>
      ) : null}
      {0 !== auditParametersSelectOptions.length && (
        <AuditParametersBlock>
          <AuditParametersTitle>
            <FormattedMessage id="Menu.audit_parameters_selection" />
          </AuditParametersTitle>
          <Select
            value={auditParametersSelectOptions.find(auditParametersOption => {
              return auditParametersOption.value === auditParametersId;
            })}
            onChange={handleAuditParametersSelection}
            options={auditParametersSelectOptions}
          />
        </AuditParametersBlock>
      )}
      {isUserAdminOfProject(user, project) && (
        <ProjectSettingsLink
          key={project.uuid}
          to={routeDefinitions.projectSettingsGeneral.path.replace(':projectId', project.uuid)}
          margin={`0 0 ${getSpacing(4)} ${getSpacing(4)}`}
        >
          <FormattedMessage id="Menu.manage_project_settings" />
        </ProjectSettingsLink>
      )}
      <Audits>Audits</Audits>
      <AuditsAndScriptsContainer>
        {project.pagesIds.map((pageId: string) => (
          <MenuPageScriptItem key={pageId} pageId={pageId} />
        ))}
        {project.scriptsIds.map((scriptId: string) => (
          <MenuPageScriptItem key={scriptId} scriptId={scriptId} />
        ))}
      </AuditsAndScriptsContainer>
    </Container>
  );
};
