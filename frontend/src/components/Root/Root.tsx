import React, { ReactNode } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { RouteComponentProps } from 'react-router';
import { routeDefinitions } from 'routes';

import { flattenMessages } from 'services/i18n/intl';
import enMessages from 'translations/en.json';
import frMessages from 'translations/fr.json';
import { Header, Menu } from './components';
import { Body, Content, Page, PageContainer } from './Root.style';

const locales: Record<string, any> = {
  fr: flattenMessages(frMessages),
  en: flattenMessages(enMessages),
};

addLocaleData([...fr, ...en]);

// Your component own properties
interface Props extends RouteComponentProps<any> {
  hasProjects: boolean;
  isUserAuthenticated: boolean;
  children: ReactNode;
}

const Root: React.FunctionComponent<Props> = ({ children, location, isUserAuthenticated, hasProjects }) => {
  const shouldDisplayMenu = isUserAuthenticated && hasProjects;

  const userLanguage =
    (navigator.languages && navigator.languages[0]) || navigator.language || 'fr';
  // Split locales with a region code
  const userLanguageWithoutRegionCode = userLanguage.toLowerCase().split(/[_-]+/)[0];
  const localizedMessages = locales[userLanguage] || locales[userLanguageWithoutRegionCode];

  return (
    <IntlProvider locale={userLanguageWithoutRegionCode} messages={localizedMessages}>
      <PageContainer>
        <Page>
          <Header isUserAuthenticated={isUserAuthenticated} isMenuDisplayed={shouldDisplayMenu}/>
          <Body>
            {shouldDisplayMenu && <Menu />}
            <Content shouldDisplayMenu={shouldDisplayMenu}>{children}</Content>
          </Body>
        </Page>
      </PageContainer>
    </IntlProvider>
  );
};

export default Root;
