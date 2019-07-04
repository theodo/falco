import React from 'react';

import Badge from 'components/Badge';
import { MenuArrow } from 'icons';
import { InjectedIntlProps } from 'react-intl';
import { ProjectType } from 'redux/entities/projects/types';
import { routeDefinitions } from 'routes';
import { colorUsage, getSpacing } from 'stylesheet';
import { PageOrScript } from '../Menu/Menu';
import { AuditStatusHistoryIcon, AuditStatusHistoryIconContainer, MenuArrowContainer, PageScriptItem, PageScriptTitle, PageScriptTitleBlock } from '../Menu/Menu.style';


export interface OwnProps {
  project?: ProjectType;
  currentURL: string;
  pageOrScript: PageOrScript;
  auditParametersId: string | null;
};

type Props = OwnProps & InjectedIntlProps;

export const MenuPageScriptItem: React.FunctionComponent<Props> = ({
  intl,
  project,
  currentURL,
  pageOrScript,
  auditParametersId,
}) => {

  const doesLinkPathCorrespondToUrl = (linkPath: string, url: string) => {
    if (
      project &&
      url.startsWith(
        routeDefinitions.auditsDetails.path
          .replace(':projectId', project.uuid)
          .replace(':pageOrScriptId/audit-parameters/:auditParametersId', ''),
      )
    ) {
      return url.startsWith(linkPath);
    }
    return linkPath === url;
  };

  const getBadgeParams = (scriptOrPage: PageOrScript) => {
    if ('PAGE' === scriptOrPage.type) {
      const badgeText = intl.formatMessage({ id: `Menu.page_badge` });
      if (doesLinkPathCorrespondToUrl(scriptOrPage.linkPath, currentURL)) {
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
    } else if ('SCRIPT' === scriptOrPage.type) {
      const badgeText = intl.formatMessage({ id: `Menu.script_badge` });
      if (doesLinkPathCorrespondToUrl(scriptOrPage.linkPath, currentURL)) {
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



  const badgeParams = getBadgeParams(pageOrScript);
  const latestAuditStatusHistoryForCurrentAuditParameters = pageOrScript.latestAuditStatusHistories.find(
    auditStatusHistory => (auditStatusHistory.auditParametersId === auditParametersId)
  );
  const latestAuditStatusHistoryForCurrentAuditParametersStatus = latestAuditStatusHistoryForCurrentAuditParameters
    ? latestAuditStatusHistoryForCurrentAuditParameters.status
    : "ERROR"
  return (
    <PageScriptItem
      key={pageOrScript.uuid}
      to={pageOrScript.linkPath}
      className={
        doesLinkPathCorrespondToUrl(pageOrScript.linkPath, currentURL) ? 'active' : ''
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
            doesLinkPathCorrespondToUrl(pageOrScript.linkPath, currentURL)
              ? colorUsage.menuArrowSelected
              : colorUsage.menuArrow
          }
        />
      </MenuArrowContainer>
    </PageScriptItem>
  );
}
