import React, { MouseEvent, useState } from 'react';

import Logo from 'components/Logo';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { routeDefinitions } from 'routes';
import { colorUsage } from 'stylesheet';
import AccountMenu from './components/AccountMenu';
import ProjectsMenu from './components/ProjectsMenu';
import {
  HeaderBlock,
  HeaderButton,
  HeaderButtonArrow,
  HeaderButtonsBlock,
  HeaderContainer,
  HeaderContent,
  HeaderLink,
  HeaderMenu,
  LogoBlock,
  LogoContainer,
  LogoTitle,
  MenusContainer,
  Nav,
} from './Header.style';

// Your component own properties
interface Props {
  currentURL: string;
}

export const Header: React.FunctionComponent<Props & InjectedIntlProps> = ({
  currentURL,
  intl,
}) => {
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
    [headerContainerRef.current, accountMenuButtonRef.current],
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
    [headerContainerRef.current, projectsMenuButtonRef.current],
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

  const isLandingPage = currentURL === routeDefinitions.landing.path;
  const isLoginPage = currentURL === routeDefinitions.login.path;
  const shouldDisplayConnectedUserHeader = !isLandingPage && !isLoginPage;

  const [scrollPosition, setScrollPostition] = useState(0);
  window.addEventListener('scroll', () => {
    setScrollPostition(window.scrollY);
  });

  return (
    <HeaderContainer ref={headerContainerRef}>
      <HeaderBlock shouldHaveShadow={isLandingPage && scrollPosition > 10}>
        <HeaderMenu shouldDisplayConnectedUserHeader={shouldDisplayConnectedUserHeader}>
          <LogoContainer
            title={
              shouldDisplayConnectedUserHeader
                ? intl.formatMessage({ id: `Header.logo_title_app` })
                : intl.formatMessage({ id: `Header.logo_title_landing` })
            }
            to={
              shouldDisplayConnectedUserHeader
                ? routeDefinitions.projectsList.path
                : routeDefinitions.landing.path
            }
          >
            <LogoBlock>
              <Logo color={colorUsage.headerLogo} />
            </LogoBlock>
            <LogoTitle>FALCO</LogoTitle>
          </LogoContainer>
        </HeaderMenu>
        <HeaderContent shouldHaveShadow={shouldDisplayConnectedUserHeader && scrollPosition > 10}>
          {shouldDisplayConnectedUserHeader && (
            <Nav>
              <HeaderButtonsBlock>
                <HeaderButton onClick={toggleProjectsMenuVisibility} ref={projectsMenuButtonRef}>
                  <FormattedMessage id="Header.projects_button" />
                  <HeaderButtonArrow />
                </HeaderButton>
                <HeaderButton onClick={toggleAccountMenuVisibility} ref={accountMenuButtonRef}>
                  <FormattedMessage id="Header.login_button" />
                  <HeaderButtonArrow />
                </HeaderButton>
              </HeaderButtonsBlock>
            </Nav>
          )}
          {isLandingPage && (
            <HeaderLink href={routeDefinitions.login.path}>
              <FormattedMessage id="Header.connect_link" />
            </HeaderLink>
          )}
        </HeaderContent>
      </HeaderBlock>
      {shouldDisplayConnectedUserHeader && (
        <MenusContainer>
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
        </MenusContainer>
      )}
    </HeaderContainer>
  );
};
