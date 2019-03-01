import { auditResultsAction, auditResultsState } from './auditResults';
import { LoginAction, LoginState } from './login';
import { pagesAction, pagesState } from './pages';
import { projectsAction, projectsState } from './projects';

export type RootState = Readonly<{
  login: LoginState;
  projects: projectsState;
  pages: pagesState;
  auditResults: auditResultsState;
}>;
export type RootAction = LoginAction | projectsAction | pagesAction | auditResultsAction;
