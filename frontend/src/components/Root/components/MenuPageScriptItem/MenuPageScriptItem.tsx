import React from 'react';

import Badge from 'components/Badge';
import { MenuArrow } from 'icons';
import { InjectedIntlProps } from 'react-intl';
import { AuditStatusHistoryType } from 'redux/entities/auditStatusHistories/types';
import { PageType } from 'redux/entities/pages/types';
import { ScriptType } from 'redux/entities/scripts/types';
import { routeDefinitions } from 'routes';
import { colorUsage, getSpacing } from 'stylesheet';
import { AuditStatusHistoryIcon, AuditStatusHistoryIconContainer, MenuArrowContainer, PageScriptItem, PageScriptTitle, PageScriptTitleBlock } from './MenuPageScriptItem.style';


export interface OwnProps {
  pageId?: string;
  scriptId?: string;
  key: string;
};

export interface PageOrScriptType {
  uuid: string;
  title: string;
  linkPath: string;
  latestAuditStatusHistory?: AuditStatusHistoryType | null;
  type: string;
};

interface Props extends OwnProps {
  projectId: string;
  page?: PageType | null;
  script?: ScriptType | null;
  pageLatestAuditStatusHistory?: AuditStatusHistoryType | null;
  scriptLatestAuditStatusHistory?: AuditStatusHistoryType | null;
  currentURL: string;
  auditParametersId: string | null;
};

export const MenuPageScriptItem: React.FunctionComponent<Props & InjectedIntlProps> = ({
  intl,
  projectId,
  page,
  script,
  pageLatestAuditStatusHistory,
  scriptLatestAuditStatusHistory,
  currentURL,
  auditParametersId,
}) => {

  const pageOrScript: PageOrScriptType | undefined = page ? ({
    uuid: page.uuid,
    title: page.name,
    latestAuditStatusHistory: pageLatestAuditStatusHistory,
    linkPath: routeDefinitions.auditsDetails.path
      .replace(':projectId', projectId)
      .replace(':pageOrScriptId', page.uuid)
      .replace(':auditParametersId', auditParametersId ? auditParametersId : ''),
    type: 'PAGE',
  }) : script ? ({
    uuid: script.uuid,
    title: script.name,
    latestAuditStatusHistory: scriptLatestAuditStatusHistory,
    linkPath: routeDefinitions.auditsDetails.path
      .replace(':projectId', projectId)
      .replace(':pageOrScriptId', script.uuid)
      .replace(':auditParametersId', auditParametersId ? auditParametersId : ''),
    type: 'SCRIPT',
  }) : undefined;

  if (!pageOrScript) {
    return null;
  };

  // we determine here if the current URL is the one of the combination project/pageOrScript/auditParameters
  // in this case the item must be visually different in order to show the user that this is the viewed page or script
  const linkPathMatchesUrl = (
    projectId &&
    currentURL.startsWith(
      routeDefinitions.auditsDetails.path
        .replace(':projectId', projectId)
        .replace(':pageOrScriptId/audit-parameters/:auditParametersId', ''),
    )
  )
    ? currentURL.startsWith(pageOrScript.linkPath)
    : pageOrScript.linkPath === currentURL;

  const getBadgeParams = () => {
    if (pageOrScript.type === 'PAGE') {
      const badgeText = intl.formatMessage({ id: `Menu.page_badge` });
      if (linkPathMatchesUrl) {
        return {
          backgroundColor: colorUsage.pageBadgeSelectedBackground,
          color: colorUsage.pageBadgeSelectedText,
          text: badgeText,
        };
      } else {
        return {
          backgroundColor: colorUsage.pageBadgeBackground,
          color: colorUsage.pageBadgeText,
          text: badgeText,
        };
      }
    } else if (pageOrScript.type === 'SCRIPT') {
      const badgeText = intl.formatMessage({ id: `Menu.script_badge` });
      if (linkPathMatchesUrl) {
        return {
          backgroundColor: colorUsage.scriptBadgeSelectedBackground,
          color: colorUsage.scriptBadgeSelectedText,
          text: badgeText,
        };
      } else {
        return {
          backgroundColor: colorUsage.scriptBadgeBackground,
          color: colorUsage.scriptBadgeText,
          text: badgeText,
        };
      }
    }
    return {
      backgroundColor: 'inherit',
      color: 'inherit',
      text: 'inherit',
    };
  };
  const badgeParams = getBadgeParams();

  const latestAuditStatusHistoryStatus = pageOrScript.latestAuditStatusHistory
    ? pageOrScript.latestAuditStatusHistory.status
    : "ERROR"
  return (
    <PageScriptItem
      to={pageOrScript.linkPath}
      className={
        linkPathMatchesUrl ? 'active' : ''
      }
    >
      <PageScriptTitleBlock>
        <AuditStatusHistoryIconContainer>
          {
            latestAuditStatusHistoryStatus !== "SUCCESS" &&
            <AuditStatusHistoryIcon
              status={latestAuditStatusHistoryStatus}
              title={
                (
                  (latestAuditStatusHistoryStatus === "ERROR")
                  &&
                  intl.formatMessage({ id: `Audits.AuditStatusHistory.audit_failure` })
                ) || (
                  (
                    latestAuditStatusHistoryStatus === "REQUESTED"
                    ||
                    latestAuditStatusHistoryStatus === "PENDING"
                  )
                  &&
                  intl.formatMessage({ id: `Audits.AuditStatusHistory.audit_running` })
                ) || (
                  intl.formatMessage({ id: `Audits.AuditStatusHistory.audit_failure` })
                )
              }
            />
          }
        </AuditStatusHistoryIconContainer>
        <>
          <PageScriptTitle>{pageOrScript.title}</PageScriptTitle>
        </>
        {pageOrScript.type && (
          <Badge
            backgroundColor={badgeParams.backgroundColor}
            color={badgeParams.color}
            margin={`0 0 0 ${getSpacing(4)}`}
            text={badgeParams.text}
          />
        )}
      </PageScriptTitleBlock>
      <MenuArrowContainer margin={`0 0 0 ${getSpacing(4)}`} height="20px">
        <MenuArrow
          color={
            linkPathMatchesUrl
              ? colorUsage.menuArrowSelected
              : colorUsage.menuArrow
          }
          width="20px"
          height="20px"
        />
      </MenuArrowContainer>
    </PageScriptItem>
  );
}
