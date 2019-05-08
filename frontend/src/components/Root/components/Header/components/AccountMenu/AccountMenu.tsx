import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { userState } from 'redux/user/reducer';
import { routeDefinitions } from 'routes';
import { colorUsage } from 'stylesheet';

import Style from './AccountMenu.style';

interface OwnProps {
  fetchUserRequest: () => void;
  logoutUserRequest: () => void;
  isVisible: boolean;
  position?: string;
  right?: string | null;
  user: userState;
  userToken: string | null;
}

type Props = OwnProps & InjectedIntlProps & RouteComponentProps;

export const AccountMenu: React.FunctionComponent<Props> = ({
  fetchUserRequest,
  history,
  isVisible,
  logoutUserRequest,
  position,
  right,
  user,
  userToken,
}) => {
  React.useEffect(
    () => {
      fetchUserRequest();
    },
    [userToken],
  );
  const capitalize = (word: any) => {
    if (typeof word !== 'string') {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const logoutUser = () => {
    logoutUserRequest();
    history.push(routeDefinitions.login.path);
  };

  if (isVisible) {
    if (null === user) {
      return (
        <Style.Container position={position} right={right}>
          <Style.LoaderContainer color={colorUsage.loader}>
            <CircularProgress color={'inherit'} />
          </Style.LoaderContainer>
        </Style.Container>
      );
    }
    return (
      <Style.Container position={position} right={right}>
        <Style.UserInfosBlock>
          <Style.UserName>
            {capitalize(user.firstName)} {capitalize(user.lastName)}
          </Style.UserName>
          <Style.UserEmail>{user.emailAddress.toLowerCase()}</Style.UserEmail>
        </Style.UserInfosBlock>
        <Style.UserActionsBlock>
          <Style.UserActionItem margin={'0'}>
            <Style.UserActionLink onClick={logoutUser}>
              <FormattedMessage id="Header.logoff_link" />
            </Style.UserActionLink>
          </Style.UserActionItem>
        </Style.UserActionsBlock>
      </Style.Container>
    );
  }
  return <div />;
};
