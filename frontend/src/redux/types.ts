import { RouterState } from 'connected-react-router';
import { PersistPartial } from 'redux-persist/lib/persistReducer';
import { auditResultsAction, auditResultsState } from './auditResults';
import { LoginAction, LoginState } from './login';
import { projectsAction, projectsState } from './projects';
import { userAction, userState } from './user';

export type RootState = Readonly<{
  login: LoginState & PersistPartial;
  projects: projectsState;
  auditResults: auditResultsState;
  user: userState;
}>;
// This type allows url fetching from anywhere without modifying the RootState
export type RootStateWithRouter = RootState & Readonly<{ router: RouterState }>;

export type RootAction =
  | LoginAction
  | projectsAction
  | auditResultsAction
  | userAction;
