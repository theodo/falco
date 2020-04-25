import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { NameHeader, UrlHeader } from '../PageTable.style';

export const PageRowHeader: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <NameHeader>
        <FormattedMessage id="ProjectSettings.page_name" />
      </NameHeader>
      <UrlHeader>
        <FormattedMessage id="ProjectSettings.page_url" />
      </UrlHeader>
    </React.Fragment>
  );
};
