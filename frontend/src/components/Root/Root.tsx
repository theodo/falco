import Typography from '@material-ui/core/Typography';
import React, { ReactNode } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

import { flattenMessages } from 'services/i18n/intl';
import enMessages from 'translations/en.json';
import frMessages from 'translations/fr.json';
import logo from './pudding.png';
import StyledRoot from './Root.style';

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
    <StyledRoot>
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
        <Typography variant="h2" color="primary">
          Welcome to Seed
        </Typography>
      </div>
      {children}
    </StyledRoot>
  </IntlProvider>
);

export default Root;
