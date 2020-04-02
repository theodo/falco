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
  HeaderMenuItem,
  HeaderMenuItemContent,
  LogoBlock,
  LogoContainer,
  LogoTitle,
  Nav,
} from './Header.style';

// Your component own properties
interface Props {
  currentURL: string;
  isUserAuthenticated: boolean;
  isMenuDisplayed: boolean;
  fetchUserRequest: () => void;
}

export const Header: React.FunctionComponent<Props & InjectedIntlProps> = ({
  currentURL,
  fetchUserRequest,
  isUserAuthenticated,
  isMenuDisplayed,
  intl,
}) => {
  const [isAccountMenuVisible, setIsAccountMenuVisible] = React.useState(false);
  const [isProjectsMenuVisible, setIsProjectsMenuVisible] = React.useState(false);

  React.useEffect(
    () => {
      if (isUserAuthenticated) {
        fetchUserRequest();
      }
    },
    [isUserAuthenticated, fetchUserRequest],
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
  const shouldDisplayConnectedUserHeader = isUserAuthenticated;

  const [scrollPosition, setScrollPosition] = useState(0);
  window.addEventListener('scroll', () => {
    setScrollPosition(window.scrollY);
  });

  return (
    <HeaderContainer>
      <HeaderBlock shouldHaveShadow={isLandingPage && scrollPosition > 10}>
        <HeaderMenu isMenuDisplayed={isMenuDisplayed}>
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
          {shouldDisplayConnectedUserHeader ? (
            <Nav role="navigation">
              <HeaderButtonsBlock>
                <HeaderMenuItem onClick={toggleProjectsMenuVisibility} role="menu">
                  <HeaderButton>
                    <FormattedMessage id="Header.projects_button" />
                  </HeaderButton>
                  <HeaderButtonArrow />
                  <HeaderMenuItemContent>
                    {isProjectsMenuVisible && <ProjectsMenu />}
                  </HeaderMenuItemContent>
                </HeaderMenuItem>
                <HeaderMenuItem onClick={toggleAccountMenuVisibility} role="menu">
                  <HeaderButton>
                    <FormattedMessage id="Header.login_button" />
                  </HeaderButton>
                  <HeaderButtonArrow />
                  <HeaderMenuItemContent>
                    {isAccountMenuVisible && <AccountMenu />}
                  </HeaderMenuItemContent>
                </HeaderMenuItem>
              </HeaderButtonsBlock>
            </Nav>
          ) : (
            <>
              <HeaderLink to={routeDefinitions.login.path}>
                <FormattedMessage id="Header.login_link" />
              </HeaderLink>
              <HeaderLink to={routeDefinitions.signUp.path}>
                <FormattedMessage id="Header.signup_link" />
              </HeaderLink>
            </>
          )}
        </HeaderContent>
      </HeaderBlock>
    </HeaderContainer>
  );
};
