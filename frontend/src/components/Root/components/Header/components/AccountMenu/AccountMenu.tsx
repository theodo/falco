import Loader from 'components/Loader';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { useCurrentUser } from 'redux/user/selectors';
import { routeDefinitions } from 'routes';
import {
  Container,
  UserActionItem,
  UserActionItemButton,
  UserActionItemExternalLink,
  UserActionsBlock,
  UserEmail,
  UserInfosBlock,
  UserInfosBlockContainer,
  UserName,
} from './AccountMenu.style';
import { DOCUMENTATION_ROOT } from 'services/constants';

interface OwnProps {
  logoutUser: (redirectTo?: string | undefined) => void;
}

type Props = OwnProps & RouteComponentProps;

export const AccountMenu: React.FunctionComponent<Props> = ({ logoutUser }) => {
  const user = useCurrentUser();

  const capitalize = (word: string) => {
    if (typeof word !== 'string') {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  if (null === user) {
    return (
      <Container>
        <Loader minHeight={'200px'} />
      </Container>
    );
  }
  return (
    <Container>
      <UserInfosBlockContainer>
        <UserInfosBlock>
          <UserName>
            {capitalize(user.firstName)} {capitalize(user.lastName)}
          </UserName>
          <UserEmail>{user.emailAddress.toLowerCase()}</UserEmail>
        </UserInfosBlock>
      </UserInfosBlockContainer>
      <UserActionsBlock>
        <UserActionItem margin={'0'}>
          <UserActionItemExternalLink
            href={DOCUMENTATION_ROOT}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id="Header.see_the_docs" />
          </UserActionItemExternalLink>
        </UserActionItem>
        {user.isStaff && (
          <UserActionItem margin={'0'}>
            <UserActionItemExternalLink href="/admin/" target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="Header.go_to_admin" />
            </UserActionItemExternalLink>
          </UserActionItem>
        )}
        <UserActionItem margin={'0'} onClick={() => logoutUser(routeDefinitions.landing.path)}>
          <UserActionItemButton>
            <FormattedMessage id="Header.logout_link" />
          </UserActionItemButton>
        </UserActionItem>
      </UserActionsBlock>
    </Container>
  );
};
