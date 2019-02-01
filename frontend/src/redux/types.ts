import { AvatarAction, AvatarState } from './Avatar';
import { LoginAction, LoginState } from './Login';

export type RootState = Readonly<{
  avatar: AvatarState;
  login: LoginState;
}>;
export type RootAction = AvatarAction | LoginAction;
