import Select from 'components/Select';
import React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { ValueType } from 'react-select/lib/types';
import { AuditStatusHistoryType, ProjectType } from 'redux/entities/projects/types';
import { routeDefinitions } from 'routes';

import { history } from 'index';
import { AuditParametersType } from 'redux/entities/auditParameters/types';
import MenuPageScriptItem from '../MenuPageScriptItem';
import {
  AuditParametersBlock,
  AuditParametersTitle,
  Audits,
  Container,
  ProjectName,
} from './Menu.style';

interface AuditParametersOption {
  value: string;
  label: string;
}

export interface PageOrScript {
  uuid: string;
  title: string;
  linkPath: string;
  latestAuditStatusHistories: AuditStatusHistoryType[];
  type: string;
}

export interface OwnProps {
  auditParametersId: string | null;
  currentPageId: string | null;
  project?: ProjectType;
  auditParametersList: AuditParametersType[],
  currentScriptId: string | null;
  scriptStepId: string | null;
  currentURL: string;
}

type Props = OwnProps & InjectedIntlProps;

export const Menu: React.FunctionComponent<Props> = ({
  auditParametersId,
  currentPageId,
  project,
  auditParametersList,
  currentScriptId,
  scriptStepId,
}) => {
  if (!project) {
    return <Container />;
  };

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

      {project && 0 !== auditParametersSelectOptions.length && (
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
      <Audits>Audits</Audits>
      {project.pagesIds.map((pageId: string) =>
        <MenuPageScriptItem
          key={pageId}
          pageId={pageId}
        />
      )}
      {project.scriptsIds.map((scriptId: string) =>
        <MenuPageScriptItem
          key={scriptId}
          scriptId={scriptId}
        />
      )}
    </Container>
  );
};
