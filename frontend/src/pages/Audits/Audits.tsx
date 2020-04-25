import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { ValueType } from 'react-select/lib/types';

import { AuditParametersType } from 'redux/entities/auditParameters/types';
import { PageType } from 'redux/entities/pages/types';
import { ProjectType } from 'redux/entities/projects/types';
import { ScriptType } from 'redux/entities/scripts/types';

import Badge from 'components/Badge';
import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import Select from 'components/Select';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { auditStatus, AuditStatusHistoryType } from 'redux/entities/auditStatusHistories/types';
import { useFetchProjectIfUndefined } from 'redux/entities/projects/useFetchProjectIfUndefined';
import { routeDefinitions } from 'routes';
import { colorUsage, getSpacing } from 'stylesheet';
import AnalyticsBlock from './AnalyticsBlock';
import {
  Container,
  PageTitle,
  PageTitleBlock,
  ScriptStepBlock,
  ScriptStepBlockTitle,
  Title,
} from './Audits.style';
import GraphsBlock from './GraphsBlock';

interface ScriptStepOption {
  value: string;
  label: string;
}

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
  pageOrScriptId: string;
  auditParametersId: string;
  scriptStepId?: string;
}>;

type Props = {
  project?: ProjectType | null;
  page?: PageType | null;
  script?: ScriptType | null;
  currentAuditParameters?: AuditParametersType | null;
  scriptSteps: Record<string, string>;
  sortedPageAuditResultsIds: string[] | null;
  sortedScriptAuditResultsIds: Record<string, string[]> | null;
  fetchProjectsRequest: (projectId: string) => void;
  pageAuditStatusHistory?: AuditStatusHistoryType | null;
  scriptAuditStatusHistory?: AuditStatusHistoryType | null;
  fetchAuditResultsRequest: (
    auditParametersId: string,
    pageOrScriptId: string,
    type: 'page' | 'script',
    fromDate?: dayjs.Dayjs,
    toDate?: dayjs.Dayjs,
  ) => void;
  setCurrentAuditParametersId: (auditParametersId: string | null | undefined) => void;
  setCurrentPageId: (pageId: string | null | undefined) => void;
  setCurrentScriptId: (scriptId: string | null | undefined) => void;
  setCurrentScriptStepId: (scriptStepId: string | null | undefined) => void;
} & OwnProps;

export const Audits: React.FunctionComponent<Props> = ({
  currentAuditParameters,
  fetchProjectsRequest,
  history,
  match,
  project,
  page,
  script,
  scriptSteps,
  sortedPageAuditResultsIds,
  sortedScriptAuditResultsIds,
  pageAuditStatusHistory,
  scriptAuditStatusHistory,
  fetchAuditResultsRequest,
  setCurrentAuditParametersId,
  setCurrentPageId,
  setCurrentScriptId,
  setCurrentScriptStepId,
}) => {
  const intl = useIntl();

  const { projectId, pageOrScriptId, auditParametersId, scriptStepId } = match.params;

  useFetchProjectIfUndefined(fetchProjectsRequest, projectId, project);

  React.useEffect(
    () => {
      const fromDate = dayjs().subtract(7, 'day');
      if (page) {
        setCurrentPageId(pageOrScriptId ? pageOrScriptId : undefined);
        setCurrentScriptId(undefined);
        if (!sortedPageAuditResultsIds) {
          fetchAuditResultsRequest(auditParametersId, pageOrScriptId, 'page', fromDate);
        }
      } else if (script) {
        setCurrentPageId(undefined);
        setCurrentScriptId(pageOrScriptId ? pageOrScriptId : undefined);
        if (!sortedScriptAuditResultsIds) {
          fetchAuditResultsRequest(auditParametersId, pageOrScriptId, 'script', fromDate);
        }
      }
    },
    // eslint is disabled because the hook exhaustive-deps wants to add page and script as dependencies, but they rerender too much
    // eslint-disable-next-line
    [
      auditParametersId,
      pageOrScriptId,
      fetchAuditResultsRequest,
      // eslint-disable-next-line
      page && page.uuid,
      // eslint-disable-next-line
      script && script.uuid,
      setCurrentPageId,
      setCurrentScriptId,
      sortedPageAuditResultsIds,
      sortedScriptAuditResultsIds,
    ],
  );

  React.useEffect(
    () => {
      setCurrentAuditParametersId(auditParametersId);
    },
    [auditParametersId, setCurrentAuditParametersId],
  );

  React.useEffect(
    () => {
      setCurrentScriptStepId(script && scriptStepId ? scriptStepId : undefined);
    },
    // eslint-disable-next-line
    [script && script.uuid, scriptStepId, setCurrentScriptStepId],
  );

  // we set a loader if the project hasn't been loaded from the server or if the page or the script haven't been
  // loaded (one of them must be defined when the page is active)
  if (project === undefined || (page === undefined && script === undefined)) {
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

  if (
    (!project.pagesIds || 0 === project.pagesIds.length) &&
    (!project.scriptsIds || 0 === project.scriptsIds.length)
  ) {
    return (
      <Container>
        <MessagePill messageType="error">
          <FormattedMessage id="Project.no_page_or_script_error" />
        </MessagePill>
      </Container>
    );
  }

  if (page === null && script === null) {
    return (
      <Container>
        <MessagePill messageType="error">
          <FormattedMessage id="Audits.page_or_script_unavailable" />
        </MessagePill>
      </Container>
    );
  }

  if (0 === project.auditParametersIds.length) {
    return (
      <Container>
        <MessagePill messageType="error">
          <FormattedMessage id="Project.no_audit_parameters_error" />
        </MessagePill>
      </Container>
    );
  }

  if (currentAuditParameters === null) {
    return (
      <Container>
        <MessagePill messageType="error">
          <FormattedMessage id="Audits.audit_parameters_unavailable" />
        </MessagePill>
      </Container>
    );
  }

  if (
    script &&
    sortedScriptAuditResultsIds &&
    0 !== Object.keys(sortedScriptAuditResultsIds).length &&
    !scriptStepId
  ) {
    return (
      <Redirect
        to={routeDefinitions.auditsScriptDetails.path
          .replace(':projectId', projectId)
          .replace(':pageOrScriptId', pageOrScriptId)
          .replace(':auditParametersId', auditParametersId)
          .replace(':scriptStepId', Object.keys(sortedScriptAuditResultsIds)[0])}
      />
    );
  }

  const getBadgeParams = () => {
    if (page) {
      return {
        backgroundColor: colorUsage.pageBadgeBackground,
        color: colorUsage.pageBadgeText,
        text: intl.formatMessage({ id: `Menu.page_badge` }),
      };
    } else if (script) {
      return {
        backgroundColor: colorUsage.scriptBadgeBackground,
        color: colorUsage.scriptBadgeText,
        text: intl.formatMessage({ id: `Menu.script_badge` }),
      };
    }
    return {
      backgroundColor: '',
      color: '',
      text: '',
    };
  };

  const getLastAuditMessage = (auditStatusHistory: AuditStatusHistoryType) => {
    switch (auditStatusHistory.status) {
      case auditStatus.requested:
        return <FormattedMessage id="Audits.AuditStatusHistory.audit_requested" />;
      case auditStatus.queuing:
        return auditStatusHistory.info && auditStatusHistory.info.positionInQueue ? (
          <FormattedMessage
            id="Audits.AuditStatusHistory.audit_in_queue_behind"
            values={{ positionInQueue: auditStatusHistory.info.positionInQueue }}
          />
        ) : (
          <FormattedMessage id="Audits.AuditStatusHistory.audit_in_queue" />
        );
      case auditStatus.running:
        if (auditStatusHistory.info && auditStatusHistory.info.runningTime) {
          return (
            <FormattedMessage
              id="Audits.AuditStatusHistory.audit_started"
              values={{ runningTime: auditStatusHistory.info.runningTime }}
            />
          );
        } else if (
          auditStatusHistory.info &&
          auditStatusHistory.info.totalTests &&
          auditStatusHistory.info.completedTests
        ) {
          return (
            <FormattedMessage
              id="Audits.AuditStatusHistory.audit_tests_running"
              values={{
                completedTests: auditStatusHistory.info.completedTests,
                totalTests: auditStatusHistory.info.totalTests,
              }}
            />
          );
        }
    }
    return <FormattedMessage id="Audits.AuditStatusHistory.audit_in_queue" />;
  };

  const pageOrScriptName = page ? page.name : script ? script.name : '';

  const latestAuditStatusHistory = page
    ? pageAuditStatusHistory
    : script
    ? scriptAuditStatusHistory
    : null;

  const badgeParams = getBadgeParams();

  const sortedAuditResultsIds = page
    ? sortedPageAuditResultsIds
    : script && sortedScriptAuditResultsIds
    ? scriptStepId && sortedScriptAuditResultsIds[scriptStepId]
      ? sortedScriptAuditResultsIds[scriptStepId]
      : []
    : null;

  const scriptStepSelectOptions = Object.keys(scriptSteps).map(scriptStepKey => ({
    value: scriptStepKey,
    label:
      (scriptStepKey !== 'null' ? scriptStepKey : 0) +
      ' : ' +
      (scriptSteps[scriptStepKey] || 'Unknown step'),
  }));

  const handleScriptStepSelection = (selectedOption: ValueType<ScriptStepOption | {}>) => {
    // Check needed to avoid TS2339 error
    if (selectedOption && 'value' in selectedOption) {
      history.push(
        routeDefinitions.auditsScriptDetails.path
          .replace(':projectId', projectId)
          .replace(':pageOrScriptId', pageOrScriptId)
          .replace(':auditParametersId', auditParametersId)
          .replace(':scriptStepId', selectedOption.value),
      );
    }
  };

  return (
    <Container>
      <PageTitleBlock>
        <PageTitle>{project.name + ' / ' + pageOrScriptName}</PageTitle>
        {(page || script) && (
          <Badge
            backgroundColor={badgeParams.backgroundColor}
            color={badgeParams.color}
            margin={`0 0 0 ${getSpacing(4)}`}
            text={badgeParams.text}
          />
        )}
      </PageTitleBlock>
      {latestAuditStatusHistory &&
        auditStatus.success !== latestAuditStatusHistory.status &&
        (auditStatus.error === latestAuditStatusHistory.status ? (
          <MessagePill messageType="error">
            <FormattedMessage id="Audits.AuditStatusHistory.audit_failure" />
          </MessagePill>
        ) : (
          <MessagePill messageType="info">
            {getLastAuditMessage(latestAuditStatusHistory)}
          </MessagePill>
        ))}
      <Title>
        <FormattedMessage id="Audits.title" />
      </Title>
      {script && 0 !== scriptStepSelectOptions.length && (
        <ScriptStepBlock>
          <ScriptStepBlockTitle>
            <FormattedMessage id="Audits.script_step_selection" />
          </ScriptStepBlockTitle>
          <Select
            defaultValue={scriptStepSelectOptions.find(scriptStepOption => {
              return scriptStepOption.value === scriptStepId;
            })}
            onChange={handleScriptStepSelection}
            options={scriptStepSelectOptions}
            margin={`0 0 ${getSpacing(4)} 0`}
          />
        </ScriptStepBlock>
      )}
      <GraphsBlock blockMargin={`0 0 ${getSpacing(8)} 0`} auditResultIds={sortedAuditResultsIds} />
      <Title>
        <FormattedMessage id="Audits.webpagetest_analysis" />
      </Title>
      <AnalyticsBlock
        blockMargin={`0 0 ${getSpacing(8)} 0`}
        auditResultIds={sortedAuditResultsIds}
      />
    </Container>
  );
};
