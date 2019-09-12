import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { NameHeader, UrlHeader } from './PageRow.style';

export const PageRowHeader: React.FunctionComponent<InjectedIntlProps> = ({
    intl
}) => {

  return (
    <React.Fragment>
      <NameHeader>
        {intl.formatMessage({ id: "ProjectSettings.page_name"})}
      </NameHeader> 
      <UrlHeader>
        {intl.formatMessage({ id: "ProjectSettings.page_url"})}
      </UrlHeader>
    </React.Fragment>
  )
}
