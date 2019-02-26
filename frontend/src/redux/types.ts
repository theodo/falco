import { AvatarAction, AvatarState } from './Avatar';
import { LoginAction, LoginState } from './Login';
import { projectsAction, projectsState } from './projects';
import { pagesAction, pagesState } from './pages';

export type RootState = Readonly<{
  avatar: AvatarState;
  login: LoginState;
  projects: projectsState;
  pages: pagesState;
}>;
export type RootAction = AvatarAction | LoginAction | projectsAction | pagesAction;
