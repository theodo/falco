import { AvatarAction, AvatarState } from './Avatar';
import { LoginAction, LoginState } from './Login';
import { projectsAction, projectsState } from './projects';

export type RootState = Readonly<{
  avatar: AvatarState;
  login: LoginState;
  projects: projectsState;
}>;
export type RootAction = AvatarAction | LoginAction | projectsAction;
