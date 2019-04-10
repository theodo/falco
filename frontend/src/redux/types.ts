import { auditResultsAction, auditResultsState } from './auditResults';
import { LoginAction, LoginState } from './login';
import { pagesAction, pagesState } from './pages';
import { projectsAction, projectsState } from './projects';
import { scriptsAction, scriptsState } from './scripts';

export type RootState = Readonly<{
  login: LoginState;
  projects: projectsState;
  pages: pagesState;
  scripts: scriptsState;
  auditResults: auditResultsState;
}>;
export type RootAction = LoginAction | projectsAction | pagesAction | scriptsAction | auditResultsAction;
