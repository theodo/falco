import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ProjectType } from 'redux/projects/types';

import Badge from 'components/Badge';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { MetricType } from 'redux/auditResults/types';
import { PageType } from 'redux/pages/types';
import { ScriptType } from 'redux/scripts/types';
import { colorUsage, getSpacing } from 'stylesheet';
import Style from './Audits.style';
import GraphsBlock from './GraphsBlock';

export type OwnProps = {} & RouteComponentProps<{
  projectId: string;
  pageOrScriptId: string;
}>;

type Props = {
  project?: ProjectType;
  page?: PageType;
  script?: ScriptType;
  sortedAuditResultsIds: string[];
  fetchAuditResultsRequest: (id: string, type: 'page' | 'script') => void;
} & InjectedIntlProps;

export const Audits: React.FunctionComponent<Props> = ({
  intl,
  project,
  page,
  script,
  sortedAuditResultsIds,
  fetchAuditResultsRequest,
}) => {
  const pageOrScript = page || script;

  if (pageOrScript) {
    React.useEffect(
      () => {
        fetchAuditResultsRequest(pageOrScript.uuid, 'page');
      },
      [pageOrScript.uuid],
    );
  }

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

  const badgeParams = getBadgeParams();

  const metrics: MetricType[] = [
    'WPTMetricFirstViewTTI',
    'WPTMetricFirstViewSpeedIndex',
    'WPTMetricFirstViewTimeToFirstByte',
  ];

  return (
    <Style.Container>
      <Style.PageTitleBlock>
        <Style.PageTitle>{project.name + ' / ' + pageOrScriptName}</Style.PageTitle>
        {(page || script) && (
          <Badge
            backgroundColor={badgeParams.backgroundColor}
            color={badgeParams.color}
            margin={'0 0 0 ' + getSpacing(4)}
            text={badgeParams.text}
          />
        )}
      </Style.PageTitleBlock>
      <Style.Dashboard>Dashboard</Style.Dashboard>
      <GraphsBlock auditResultIds={sortedAuditResultsIds} metrics={metrics} />
    </Style.Container>
  );
};
