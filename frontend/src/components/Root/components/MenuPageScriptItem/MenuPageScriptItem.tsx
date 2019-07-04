import React from 'react';

import Badge from 'components/Badge';
import { MenuArrow } from 'icons';
import { InjectedIntlProps } from 'react-intl';
import { PageType } from 'redux/entities/pages/types';
import { ScriptType } from 'redux/entities/scripts/types';
import { routeDefinitions } from 'routes';
import { colorUsage, getSpacing } from 'stylesheet';
import { PageOrScript } from '../Menu/Menu';
import { AuditStatusHistoryIcon, AuditStatusHistoryIconContainer, MenuArrowContainer, PageScriptItem, PageScriptTitle, PageScriptTitleBlock } from './MenuPageScriptItem.style';


export interface OwnProps {
  pageId?: string;
  scriptId?: string;
  key: string;
};

interface Props extends OwnProps {
  projectId: string;
  page?: PageType | null;
  script?: ScriptType | null;
  currentURL: string;
  auditParametersId: string | null;
};

export const MenuPageScriptItem: React.FunctionComponent<Props & InjectedIntlProps> = ({
  intl,
  projectId,
  page,
  script,
  currentURL,
  auditParametersId,
}) => {

  const pageOrScript: PageOrScript | undefined = page ? ({
    uuid: page.uuid,
    title: page.name,
    latestAuditStatusHistories: page.latestAuditStatusHistories,
    linkPath: routeDefinitions.auditsDetails.path
      .replace(':projectId', projectId)
      .replace(':pageOrScriptId', page.uuid)
      .replace(':auditParametersId', auditParametersId ? auditParametersId : ''),
    type: 'PAGE',
  }) : script ? ({
    uuid: script.uuid,
    title: script.name,
    latestAuditStatusHistories: script.latestAuditStatusHistories,
    linkPath: routeDefinitions.auditsDetails.path
      .replace(':projectId', projectId)
      .replace(':pageOrScriptId', script.uuid)
      .replace(':auditParametersId', auditParametersId ? auditParametersId : ''),
    type: 'SCRIPT',
  }) : undefined;

  if (!pageOrScript) {
    return null;
  }

  const linkPathCorrespondsToUrl = (
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
    if ('PAGE' === pageOrScript.type) {
      const badgeText = intl.formatMessage({ id: `Menu.page_badge` });
      if (linkPathCorrespondsToUrl) {
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
    } else if ('SCRIPT' === pageOrScript.type) {
      const badgeText = intl.formatMessage({ id: `Menu.script_badge` });
      if (linkPathCorrespondsToUrl) {
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
      backgroundColor: '',
      color: '',
      text: '',
    };
  };
  const badgeParams = getBadgeParams();

  const latestAuditStatusHistoryForCurrentAuditParameters = pageOrScript.latestAuditStatusHistories.find(
    auditStatusHistory => (auditStatusHistory.auditParametersId === auditParametersId)
  );
  const latestAuditStatusHistoryForCurrentAuditParametersStatus = latestAuditStatusHistoryForCurrentAuditParameters
    ? latestAuditStatusHistoryForCurrentAuditParameters.status
    : "ERROR"
  return (
    <PageScriptItem
      to={pageOrScript.linkPath}
      className={
        linkPathCorrespondsToUrl ? 'active' : ''
      }
    >
      <PageScriptTitleBlock>
        <AuditStatusHistoryIconContainer>
          {
            latestAuditStatusHistoryForCurrentAuditParametersStatus !== "SUCCESS" &&
            <AuditStatusHistoryIcon
              status={latestAuditStatusHistoryForCurrentAuditParametersStatus}
              title={
                (
                  (latestAuditStatusHistoryForCurrentAuditParametersStatus === "ERROR")
                  &&
                  intl.formatMessage({ id: `Audits.AuditStatusHistory.audit_failure` })
                ) || (
                  (
                    latestAuditStatusHistoryForCurrentAuditParametersStatus === "REQUESTED"
                    ||
                    latestAuditStatusHistoryForCurrentAuditParametersStatus === "PENDING"
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
      <MenuArrowContainer margin={`0 0 0 ${getSpacing(4)}`}>
        <MenuArrow
          color={
            linkPathCorrespondsToUrl
              ? colorUsage.menuArrowSelected
              : colorUsage.menuArrow
          }
        />
      </MenuArrowContainer>
    </PageScriptItem>
  );
}
