import * as React from 'react';
import { useIntl } from 'react-intl';
import { NameHeader, UrlHeader } from '../PageTable.style';

export const PageRowHeader: React.FunctionComponent = () => {
  const intl = useIntl();

  return (
    <React.Fragment>
      <NameHeader>{intl.formatMessage({ id: 'ProjectSettings.page_name' })}</NameHeader>
      <UrlHeader>{intl.formatMessage({ id: 'ProjectSettings.page_url' })}</UrlHeader>
    </React.Fragment>
  );
};
