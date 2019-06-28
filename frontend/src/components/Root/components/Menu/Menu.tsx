import Badge from 'components/Badge';
import Select from 'components/Select';
import { MenuArrow } from 'icons';
import React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { ValueType } from 'react-select/lib/types';
import { AuditStatusHistoryType, ProjectType } from 'redux/projects/types';
import { routeDefinitions } from 'routes';
import { colorUsage, getSpacing } from 'stylesheet';

import { history } from 'index';
import {
  AuditParametersBlock,
  AuditParametersTitle,
  Audits,
  AuditStatusHistoryIcon,
  AuditStatusHistoryIconContainer,
  Container,
  MenuArrowContainer,
  PageScriptItem,
  PageScriptTitle,
  PageScriptTitleBlock,
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
  scriptId: string | null;
  scriptStepId: string | null;
  currentURL: string;
}

type Props = OwnProps & InjectedIntlProps;

export const Menu: React.FunctionComponent<Props> = ({
  auditParametersId,
  currentURL,
  intl,
  pageId,
  project,
  scriptId,
  scriptStepId,
}) => {
  if (!project) {
    return <Container />;
  }

  const pagesAndScripts = [
    ...project.pages.map(page => ({
      uuid: page.uuid,
      title: page.name,
      latestAuditStatusHistories: page.latestAuditStatusHistories,
      linkPath: routeDefinitions.auditsDetails.path
        .replace(':projectId', project.uuid)
        .replace(':pageOrScriptId', page.uuid)
        .replace(':auditParametersId', auditParametersId ? auditParametersId : ''),
      type: 'PAGE',
    })),
    ...project.scripts.map(script => ({
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

  const getBadgeParams = (pageOrScript: PageOrScript) => {
    if ('PAGE' === pageOrScript.type) {
      const badgeText = intl.formatMessage({ id: `Menu.page_badge` });
      if (doesLinkPathCorrespondToUrl(pageOrScript.linkPath, currentURL)) {
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
      if (doesLinkPathCorrespondToUrl(pageOrScript.linkPath, currentURL)) {
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

  const auditParametersSelectOptions = project.auditParametersList.map(auditParameters => ({
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
      {pagesAndScripts.map((pageOrScript: PageOrScript) => {
        const badgeParams = getBadgeParams(pageOrScript);
        const latestAuditStatusHistory = pageOrScript.latestAuditStatusHistories.find(
          auditStatusHistory => (auditStatusHistory.auditParametersId === auditParametersId)
        );
        const latestAuditStatusHistoryStatus = latestAuditStatusHistory ? latestAuditStatusHistory.status : "ERROR"
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
      })}
    </Container>
  );
};
