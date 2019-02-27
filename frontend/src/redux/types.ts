import { LoginAction, LoginState } from './Login';
import { projectsAction, projectsState } from './projects';
import { pagesAction, pagesState } from './pages';
import { auditResultsState, auditResultsAction } from './auditResults';

export type RootState = Readonly<{
  login: LoginState;
  projects: projectsState;
  pages: pagesState;
  auditResults: auditResultsState;
}>;
export type RootAction = LoginAction | projectsAction | pagesAction | auditResultsAction;
