import React, { MouseEvent } from 'react';

import Logo from 'components/Logo';
import { FormattedMessage } from 'react-intl';
import { routeDefinitions } from 'routes';
import { colorUsage } from 'stylesheet';
import AccountMenu from './components/AccountMenu';
import ProjectsMenu from './components/ProjectsMenu';
import Style from './Header.style';

// Your component own properties
interface Props {
  [n: string]: never;
}

const Header: React.FunctionComponent<Props> = () => {
  const [isAccountMenuVisible, setIsAccountMenuVisible] = React.useState(false);
  const [accountMenuRight, setAccountMenuRight] = React.useState('auto');
  const [isProjectsMenuVisible, setIsProjectsMenuVisible] = React.useState(false);
  const [projectsMenuRight, setProjectsMenuRight] = React.useState('auto');

  const headerContainerRef = React.useRef<HTMLDivElement>(null);
  const accountMenuButtonRef = React.useRef<HTMLLIElement>(null);
  const projectsMenuButtonRef = React.useRef<HTMLLIElement>(null);

  React.useEffect(
    () => {
      if (headerContainerRef.current && accountMenuButtonRef.current) {
        setAccountMenuRight(
          Math.floor(
            headerContainerRef.current.getBoundingClientRect().right -
              accountMenuButtonRef.current.getBoundingClientRect().right -
              15,
          ) + 'px',
        );
      }
    },
    [headerContainerRef, accountMenuButtonRef],
  );

  React.useEffect(
    () => {
      if (headerContainerRef.current && projectsMenuButtonRef.current) {
        setProjectsMenuRight(
          Math.floor(
            headerContainerRef.current.getBoundingClientRect().right -
              projectsMenuButtonRef.current.getBoundingClientRect().right -
              15,
          ) + 'px',
        );
      }
    },
    [headerContainerRef, projectsMenuButtonRef],
  );

  const toggleAccountMenuVisibility = (event: MouseEvent) => {
    event.preventDefault();
    if (isAccountMenuVisible) {
      hideAccountMenu();
    } else {
      showAccountMenu();
    }
  };

  const showAccountMenu = () => {
    setIsAccountMenuVisible(true);
    document.addEventListener('click', hideAccountMenu);
  };

  const hideAccountMenu = () => {
    setIsAccountMenuVisible(false);
    document.removeEventListener('click', hideAccountMenu);
  };

  const toggleProjectsMenuVisibility = (event: MouseEvent) => {
    event.preventDefault();
    if (isProjectsMenuVisible) {
      hideProjectsMenu();
    } else {
      showProjectsMenu();
    }
  };

  const showProjectsMenu = () => {
    setIsProjectsMenuVisible(true);
    document.addEventListener('click', hideProjectsMenu);
  };

  const hideProjectsMenu = () => {
    setIsProjectsMenuVisible(false);
    document.removeEventListener('click', hideProjectsMenu);
  };

  return (
    <Style.HeaderContainer ref={headerContainerRef}>
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
              <Style.HeaderButton
                onClick={toggleProjectsMenuVisibility}
                ref={projectsMenuButtonRef}
              >
                <FormattedMessage id="Header.projects_button" />
                <Style.HeaderButtonArrow />
              </Style.HeaderButton>
              <Style.HeaderButton onClick={toggleAccountMenuVisibility} ref={accountMenuButtonRef}>
                <FormattedMessage id="Header.login_button" />
                <Style.HeaderButtonArrow />
              </Style.HeaderButton>
            </Style.HeaderButtonsBlock>
          </Style.Nav>
        </Style.HeaderContent>
      </Style.Header>
      <Style.MenusContainer>
        <ProjectsMenu
          isVisible={isProjectsMenuVisible}
          position={'absolute'}
          right={projectsMenuRight}
        />
        <AccountMenu
          isVisible={isAccountMenuVisible}
          position={'absolute'}
          right={accountMenuRight}
        />
      </Style.MenusContainer>
    </Style.HeaderContainer>
  );
};

export default Header;
