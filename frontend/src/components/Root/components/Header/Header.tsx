import React from 'react';

import Logo from 'components/Logo';
import { colorUsage } from 'stylesheet';
import Style from './Header.style';

// Your component own properties
interface Props {
  [n: string]: never;
}

const Header: React.FunctionComponent<Props> = () => (
  <Style.Header>
    <Style.HeaderMenu>
      <Style.LogoContainer>
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
            MES PROJETS
            <Style.HeaderButtonArrow />
          </Style.HeaderButton>
          <Style.HeaderButton>
            MON COMPTE
            <Style.HeaderButtonArrow />
          </Style.HeaderButton>
        </Style.HeaderButtonsBlock>
      </Style.Nav>
    </Style.HeaderContent>
  </Style.Header>
);

export default Header;
