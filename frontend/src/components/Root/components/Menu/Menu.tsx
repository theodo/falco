import Select from 'components/Select';
import React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { ValueType } from 'react-select/lib/types';
import { AuditStatusHistoryType, ProjectType } from 'redux/entities/projects/types';
import { routeDefinitions } from 'routes';

import { history } from 'index';
import { AuditParametersType } from 'redux/entities/auditParameters/types';
import { PageType } from 'redux/entities/pages/types';
import { ScriptType } from 'redux/entities/scripts/types';
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
  pageId: string | null;
  project?: ProjectType;
  pages: PageType[];
  scripts: ScriptType[];
  auditParametersList: AuditParametersType[],
  scriptId: string | null;
  scriptStepId: string | null;
  currentURL: string;
}

type Props = OwnProps & InjectedIntlProps;

export const Menu: React.FunctionComponent<Props> = ({
  auditParametersId,
  pageId,
  project,
  pages,
  scripts,
  auditParametersList,
  scriptId,
  scriptStepId,
}) => {
  if (!project) {
    return <Container />;
  }

  const pagesAndScripts = [
    ...pages.map(page => ({
      uuid: page.uuid,
      title: page.name,
      latestAuditStatusHistories: page.latestAuditStatusHistories,
      linkPath: routeDefinitions.auditsDetails.path
        .replace(':projectId', project.uuid)
        .replace(':pageOrScriptId', page.uuid)
        .replace(':auditParametersId', auditParametersId ? auditParametersId : ''),
      type: 'PAGE',
    })),
    ...scripts.map(script => ({
      uuid: script.uuid,
      title: script.name,
      latestAuditStatusHistories: script.latestAuditStatusHistories,
      linkPath: routeDefinitions.auditsDetails.path
        .replace(':projectId', project.uuid)
        .replace(':pageOrScriptId', script.uuid)
        .replace(':auditParametersId', auditParametersId ? auditParametersId : ''),
      type: 'SCRIPT',
    })),
  ];

  const auditParametersSelectOptions = auditParametersList.map(auditParameters => ({
    value: auditParameters.uuid,
    label: auditParameters.name,
  }));

  const handleAuditParametersSelection = (
    selectedOption: ValueType<AuditParametersOption | {}>,
  ) => {
    // Check needed to avoid TS2339 error
    if (selectedOption && 'value' in selectedOption && auditParametersId) {
      if (pageId) {
        history.push(
          routeDefinitions.auditsDetails.path
            .replace(':projectId', project.uuid)
            .replace(':pageOrScriptId', pageId)
            .replace(':auditParametersId', selectedOption.value),
        );
      } else if (scriptId) {
        if (!scriptStepId) {
          history.push(
            routeDefinitions.auditsDetails.path
              .replace(':projectId', project.uuid)
              .replace(':pageOrScriptId', scriptId)
              .replace(':auditParametersId', selectedOption.value),
          );
        } else {
          history.push(
            routeDefinitions.auditsScriptDetails.path
              .replace(':projectId', project.uuid)
              .replace(':pageOrScriptId', scriptId)
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
      {pagesAndScripts.map((pageOrScript: PageOrScript) =>
        <MenuPageScriptItem
          key={pageOrScript.uuid}
          pageId={pageOrScript.type === "PAGE" ? pageOrScript.uuid : undefined}
          scriptId={pageOrScript.type === "SCRIPT" ? pageOrScript.uuid : undefined}
        />
      )}
    </Container>
  );
};
