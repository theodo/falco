import { AvatarAction, AvatarState } from './Avatar';
import { LoginAction, LoginState } from './Login';
import { projectsAction, projectsState } from './projects';
import { pagesAction, pagesState } from './pages';
import { auditResultsState, auditResultsAction } from './auditResults';

export type RootState = Readonly<{
  avatar: AvatarState;
  login: LoginState;
  projects: projectsState;
  pages: pagesState;
  auditResults: auditResultsState;
}>;
export type RootAction =
  | AvatarAction
  | LoginAction
  | projectsAction
  | pagesAction
  | auditResultsAction;
