import Typography from '@material-ui/core/Typography';
import React, { ReactNode } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

import { flattenMessages } from 'services/i18n/intl';
import enMessages from 'translations/en.json';
import frMessages from 'translations/fr.json';
import logo from './logo.png';
import Style from './Root.style';

const locales = {
  fr: flattenMessages(frMessages),
  en: flattenMessages(enMessages),
};

addLocaleData([...fr, ...en]);

interface Props {
  children: ReactNode;
}

const Root: React.SFC<Props> = ({ children }) => (
  <IntlProvider locale="fr" messages={locales.fr}>
    <Style.Container>
      <Style.Header>
        <Style.Logo>
          <img src={logo} alt="Falco logo" />
          <h1>FALCO</h1>
        </Style.Logo>
      </Style.Header>
      {children}
    </Style.Container>
  </IntlProvider>
);

export default Root;
