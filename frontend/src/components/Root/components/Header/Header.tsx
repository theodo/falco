import React from 'react';

import Logo from 'components/Logo';
import { FormattedMessage } from 'react-intl';
import { routeDefinitions } from 'routes';
import { colorUsage } from 'stylesheet';
import Style from './Header.style';

// Your component own properties
interface Props {
  [n: string]: never;
}

const Header: React.FunctionComponent<Props> = () => (
  <Style.Header>
    <Style.HeaderMenu>
      <Style.LogoContainer to={routeDefinitions.projectsList.path}>
        <Style.Logo>
          <Logo color={colorUsage.headerLogo} />
        </Style.Logo>
        <Style.LogoTitle>FALCO</Style.LogoTitle>
      </Style.LogoContainer>
    </Style.HeaderMenu>
    <Style.HeaderContent>
      <Style.Nav>
        <Style.HeaderButtonsBlock>
          <Style.HeaderButton>
            <FormattedMessage id="Header.projects_button" />
            <Style.HeaderButtonArrow />
          </Style.HeaderButton>
          <Style.HeaderButton>
            <FormattedMessage id="Header.login_button" />
            <Style.HeaderButtonArrow />
          </Style.HeaderButton>
        </Style.HeaderButtonsBlock>
      </Style.Nav>
    </Style.HeaderContent>
  </Style.Header>
);

export default Header;
