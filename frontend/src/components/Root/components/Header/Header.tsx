import { MouseEvent, useEffect, useState } from 'react';

import Logo from 'components/Logo';
import { FormattedMessage, useIntl } from 'react-intl';
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

enum HeaderMenuState {
  DEFAULT = 'DEFAULT',
  ACCOUNT_MENU_OPEN = 'ACCOUNT_MENU_OPEN',
  PROJECTS_MENU_OPEN = 'PROJECTS_MENU_OPEN',
}

export const Header = ({
  currentURL,
  fetchUserRequest,
  isUserAuthenticated,
  isMenuDisplayed,
}: Props): JSX.Element => {
  const intl = useIntl();

  const [headerMenuState, setHeaderMenuState] = useState<HeaderMenuState>(HeaderMenuState.DEFAULT);

  useEffect(() => {
    if (isUserAuthenticated) {
      fetchUserRequest();
    }
  }, [isUserAuthenticated, fetchUserRequest]);

  const toggleAccountMenuVisibility = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (headerMenuState === HeaderMenuState.ACCOUNT_MENU_OPEN) {
      hideAccountMenu();
    } else {
      showAccountMenu();
    }
  };

  const showAccountMenu = () => {
    setHeaderMenuState(HeaderMenuState.ACCOUNT_MENU_OPEN);
    document.addEventListener('click', hideAccountMenu);
  };

  const hideAccountMenu = () => {
    setHeaderMenuState(HeaderMenuState.DEFAULT);
    document.removeEventListener('click', hideAccountMenu);
  };

  const toggleProjectsMenuVisibility = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (headerMenuState === HeaderMenuState.PROJECTS_MENU_OPEN) {
      hideProjectsMenu();
    } else {
      showProjectsMenu();
    }
  };

  const showProjectsMenu = () => {
    setHeaderMenuState(HeaderMenuState.PROJECTS_MENU_OPEN);
    document.addEventListener('click', hideProjectsMenu);
  };

  const hideProjectsMenu = () => {
    setHeaderMenuState(HeaderMenuState.DEFAULT);
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
                </HeaderMenuItem>
                <HeaderMenuItemContent right="270">
                  {headerMenuState === HeaderMenuState.PROJECTS_MENU_OPEN && <ProjectsMenu />}
                </HeaderMenuItemContent>
                <HeaderMenuItem onClick={toggleAccountMenuVisibility} role="menu">
                  <HeaderButton>
                    <FormattedMessage id="Header.login_button" />
                  </HeaderButton>
                  <HeaderButtonArrow />
                </HeaderMenuItem>
                <HeaderMenuItemContent right="100">
                  {headerMenuState === HeaderMenuState.ACCOUNT_MENU_OPEN && <AccountMenu />}
                </HeaderMenuItemContent>
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
