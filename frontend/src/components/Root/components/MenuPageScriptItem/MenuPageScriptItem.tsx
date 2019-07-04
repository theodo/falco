import React from 'react';

import Badge from 'components/Badge';
import { MenuArrow } from 'icons';
import { InjectedIntlProps } from 'react-intl';
import { AuditStatusHistoryType } from 'redux/entities/projects/types';
import { routeDefinitions } from 'routes';
import { colorUsage, getSpacing } from 'stylesheet';
import { AuditStatusHistoryIcon, AuditStatusHistoryIconContainer, MenuArrowContainer, PageScriptItem, PageScriptTitle, PageScriptTitleBlock } from './MenuPageScriptItem.style';


export interface OwnProps {
  projectId: string;
  currentURL: string;
  auditParametersId: string | null;
  latestAuditStatusHistories: AuditStatusHistoryType[];
  title: string;
  linkPath: string;
  pageOrScriptType: string;
  key: string;
};

export const MenuPageScriptItem: React.FunctionComponent<OwnProps & InjectedIntlProps> = ({
  intl,
  projectId,
  currentURL,
  auditParametersId,
  latestAuditStatusHistories,
  title,
  linkPath,
  pageOrScriptType,
}) => {

  const linkPathCorrespondsToUrl = (
    projectId &&
    currentURL.startsWith(
      routeDefinitions.auditsDetails.path
        .replace(':projectId', projectId)
        .replace(':pageOrScriptId/audit-parameters/:auditParametersId', ''),
    )
  )
    ? currentURL.startsWith(linkPath)
    : linkPath === currentURL;

  const getBadgeParams = () => {
    if ('PAGE' === pageOrScriptType) {
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
    } else if ('SCRIPT' === pageOrScriptType) {
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

  const latestAuditStatusHistoryForCurrentAuditParameters = latestAuditStatusHistories.find(
    auditStatusHistory => (auditStatusHistory.auditParametersId === auditParametersId)
  );
  const latestAuditStatusHistoryForCurrentAuditParametersStatus = latestAuditStatusHistoryForCurrentAuditParameters
    ? latestAuditStatusHistoryForCurrentAuditParameters.status
    : "ERROR"
  return (
    <PageScriptItem
      to={linkPath}
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
          <PageScriptTitle>{title}</PageScriptTitle>
        </>
        {pageOrScriptType && (
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
