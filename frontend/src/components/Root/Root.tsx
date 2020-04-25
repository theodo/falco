import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { /* addLocaleData, */ FormattedMessage, IntlProvider } from 'react-intl';
// import en from 'react-intl/locale-data/en';
// import fr from 'react-intl/locale-data/fr';
import { RouteComponentProps } from 'react-router';

import { flattenMessages } from 'services/i18n/intl';
import enMessages from 'translations/en.json';
import frMessages from 'translations/fr.json';
import { Header, Menu } from './components';
import { Body, Content, Page, PageContainer, SkipToContent } from './Root.style';

const locales: Record<string, any> = {
  fr: flattenMessages(frMessages),
  en: flattenMessages(enMessages),
};

// addLocaleData([...fr, ...en]);

// Your component own properties
interface Props extends RouteComponentProps<any> {
  hasProjects: boolean;
  isUserAuthenticated: boolean;
  children: ReactNode;
}

const Root: React.FunctionComponent<Props> = ({
  children,
  location,
  isUserAuthenticated,
  hasProjects,
}) => {
  const shouldDisplayMenu = isUserAuthenticated && hasProjects;

  const userLanguage =
    (navigator.languages && navigator.languages[0]) || navigator.language || 'fr';
  // Split locales with a region code
  let userLanguageWithoutRegionCode = userLanguage.toLowerCase().split(/[_-]+/)[0];
  let localizedMessages = locales[userLanguage] || locales[userLanguageWithoutRegionCode];

  // Default to english if user’s locale is not available
  if (!localizedMessages) {
    userLanguageWithoutRegionCode = 'en';
    localizedMessages = locales.en;
  }

  return (
    <>
      <Helmet>
        <html lang={userLanguageWithoutRegionCode} />
      </Helmet>
      <IntlProvider locale={userLanguageWithoutRegionCode} messages={localizedMessages}>
        <PageContainer>
          <Page>
            <SkipToContent href="#start-of-content">
              <FormattedMessage id="Header.skip_to_content" />
            </SkipToContent>
            <Header isUserAuthenticated={isUserAuthenticated} isMenuDisplayed={shouldDisplayMenu} />
            <Body id="start-of-content">
              {shouldDisplayMenu && <Menu />}
              <Content shouldDisplayMenu={shouldDisplayMenu}>{children}</Content>
            </Body>
          </Page>
        </PageContainer>
      </IntlProvider>
    </>
  );
};

export default Root;
