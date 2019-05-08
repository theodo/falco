import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { ValueType } from 'react-select/lib/types';
import { ProjectType } from 'redux/projects/types';

import Badge from 'components/Badge';
import Select from 'components/Select';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { MetricType } from 'redux/auditResults/types';
import { PageType } from 'redux/pages/types';
import { ScriptType } from 'redux/scripts/types';
import { routeDefinitions } from 'routes';
import { colorUsage, getSpacing } from 'stylesheet';
import Style from './Audits.style';
import GraphsBlock from './GraphsBlock';
import WebPageTestBlock from './WebPageTestBlock';

interface ScriptStepOption {
  value: string;
  label: string;
}

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
  pageOrScriptId: string;
  scriptStepId?: string;
}>;

type Props = {
  project?: ProjectType;
  page?: PageType;
  script?: ScriptType;
  scriptSteps: Record<string, string>;
  sortedPageAuditResultsIds: string[];
  sortedScriptAuditResultsIds: Record<string, string[]>;
  fetchProjectRequest: (projectId: string) => void;
  fetchAuditResultsRequest: (id: string, type: 'page' | 'script') => void;
} & OwnProps &
  InjectedIntlProps;

export const Audits: React.FunctionComponent<Props> = ({
  fetchProjectRequest,
  history,
  intl,
  match,
  project,
  page,
  script,
  scriptSteps,
  sortedPageAuditResultsIds,
  sortedScriptAuditResultsIds,
  fetchAuditResultsRequest,
}) => {
  const { projectId, pageOrScriptId, scriptStepId } = match.params;

  React.useEffect(
    () => {
      fetchProjectRequest(projectId);
    },
    [projectId],
  );

  React.useEffect(
    () => {
      if (page) {
        fetchAuditResultsRequest(pageOrScriptId, 'page');
      } else if (script) {
        fetchAuditResultsRequest(pageOrScriptId, 'script');
      }
    },
    [pageOrScriptId, page, script],
  );

  if (!project || (!project.pages && !project.scripts)) {
    return (
      <Style.Container>
        <Style.Error>
          <FormattedMessage id="Audits.no_page_or_script" />
        </Style.Error>
      </Style.Container>
    );
  }

  if (!page && !script) {
    return (
      <Style.Container>
        <Style.LoaderContainer color={colorUsage.loader}>
          <CircularProgress color={'inherit'} />
        </Style.LoaderContainer>
      </Style.Container>
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

  const pageOrScriptName = page ? page.name : script ? script.name : '';

  const badgeParams = getBadgeParams();

  const metrics: MetricType[] = [
    'WPTMetricFirstViewTTI',
    'WPTMetricFirstViewSpeedIndex',
    'WPTMetricFirstViewLoadTime',
  ];

  const sortedAuditResultsIds = page
    ? sortedPageAuditResultsIds
    : script &&
      sortedScriptAuditResultsIds &&
      scriptStepId &&
      sortedScriptAuditResultsIds[scriptStepId]
    ? sortedScriptAuditResultsIds[scriptStepId]
    : [];

  const scriptStepSelectOptions = Object.keys(scriptSteps).map(scriptStepKey => ({
    value: scriptStepKey,
    label: scriptStepKey + ' : ' + scriptSteps[scriptStepKey],
  }));

  const handleScriptStepSelection = (selectedOption: ValueType<ScriptStepOption | {}>) => {
    // Check needed to avoid TS2339 error
    if (selectedOption && 'value' in selectedOption) {
      history.push(
        routeDefinitions.auditsScriptDetails.path
          .replace(':projectId', projectId)
          .replace(':pageOrScriptId', pageOrScriptId)
          .replace(':scriptStepId', selectedOption.value),
      );
    }
  };

  return (
    <Style.Container>
      <Style.PageTitleBlock>
        <Style.PageTitle>{project.name + ' / ' + pageOrScriptName}</Style.PageTitle>
        {(page || script) && (
          <Badge
            backgroundColor={badgeParams.backgroundColor}
            color={badgeParams.color}
            margin={`0 0 0 ${getSpacing(4)}`}
            text={badgeParams.text}
          />
        )}
      </Style.PageTitleBlock>
      <Style.Title>Dashboard</Style.Title>
      {script && 0 !== scriptStepSelectOptions.length && (
        <Style.ScriptStepBlock>
          <Style.ScriptStepBlockTitle>
            <FormattedMessage id="Audits.script_step_selection" />
          </Style.ScriptStepBlockTitle>
          <Select
            defaultValue={scriptStepSelectOptions.find(scriptStepOption => {
              return scriptStepOption.value === scriptStepId;
            })}
            onChange={handleScriptStepSelection}
            options={scriptStepSelectOptions}
            margin={`0 0 ${getSpacing(4)} 0`}
          />
        </Style.ScriptStepBlock>
      )}
      <GraphsBlock
        blockMargin={`0 0 ${getSpacing(8)} 0`}
        auditResultIds={sortedAuditResultsIds}
        metrics={metrics}
      />
      <Style.Title>
        <FormattedMessage id="Audits.webpagetest_analysis" />
      </Style.Title>
      <WebPageTestBlock
        blockMargin={`0 0 ${getSpacing(8)} 0`}
        auditResultIds={sortedAuditResultsIds}
      />
    </Style.Container>
  );
};
