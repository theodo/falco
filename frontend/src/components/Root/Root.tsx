import React, { ReactNode } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { routeDefinitions } from 'routes';
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

// Your component own properties
interface Props extends RouteComponentProps<any> {
  children: ReactNode;
}

const Root: React.SFC<Props> = ({ children, location }) => (
  <IntlProvider locale="fr" messages={locales.fr}>
    <Style.Container>
      <Style.Header>
        <Link key={'logo'} to={routeDefinitions.projectsList.path}>
          <Style.Logo>
            <img src={logo} alt="Falco logo" />
            <h1>FALCO</h1>
          </Style.Logo>
        </Link>
        <Style.Nav>
          <ul>
            <li className={location.pathname === routeDefinitions.projectsList.path ? `active` : ``}>
              <Link key={'navProjects'} to={routeDefinitions.projectsList.path}>
                PROJETS
              </Link>
            </li>
            <li className={location.pathname === routeDefinitions.login.path ? `active` : ``}>
              <Link key={'navLogin'} to={routeDefinitions.login.path}>
                SE CONNECTER
              </Link>
            </li>
          </ul>
        </Style.Nav>
      </Style.Header>
      {children}
    </Style.Container>
  </IntlProvider>
);

export default Root;
