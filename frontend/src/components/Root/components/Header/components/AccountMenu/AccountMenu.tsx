import React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { userState } from 'redux/user/reducer';
import { routeDefinitions } from 'routes';

import Loader from 'components/Loader';
import Style from './AccountMenu.style';

interface OwnProps {
  fetchUserRequest: () => void;
  logoutUser: (redirectTo?: string | undefined) => void;
  isVisible: boolean;
  position?: string;
  right?: string | null;
  user: userState;
  isUserAuthenticated: boolean;
}

type Props = OwnProps & InjectedIntlProps & RouteComponentProps;

export const AccountMenu: React.FunctionComponent<Props> = ({
  fetchUserRequest,
  isVisible,
  logoutUser,
  position,
  right,
  user,
  isUserAuthenticated,
}) => {
  React.useEffect(
    () => {
      if (isUserAuthenticated) {
        fetchUserRequest();
      }
    },
    [isUserAuthenticated],
  );
  const capitalize = (word: any) => {
    if (typeof word !== 'string') {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  if (isVisible) {
    if (null === user) {
      return (
        <Style.Container position={position} right={right}>
          <Loader minHeight={'200px'} />
        </Style.Container>
      );
    }
    return (
      <Style.Container position={position} right={right}>
        <Style.UserInfosBlockContainer>
          <Style.UserInfosBlock>
            <Style.UserName>
              {capitalize(user.firstName)} {capitalize(user.lastName)}
            </Style.UserName>
            <Style.UserEmail>{user.emailAddress.toLowerCase()}</Style.UserEmail>
          </Style.UserInfosBlock>
        </Style.UserInfosBlockContainer>
        <Style.UserActionsBlock>
          <Style.UserActionItem
            margin={'0'}
            onClick={() => logoutUser(routeDefinitions.landing.path)}
          >
            <FormattedMessage id="Header.logout_link" />
          </Style.UserActionItem>
        </Style.UserActionsBlock>
      </Style.Container>
    );
  }
  return <div />;
};
