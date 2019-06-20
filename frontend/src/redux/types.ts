import { RouterState } from 'connected-react-router';
import { PersistPartial } from 'redux-persist/lib/persistReducer';
import { LeadAction, LeadState } from 'redux/lead';
import { auditResultsAction, auditResultsState } from './auditResults';
import { ContentAction, ContentState } from './content';
import { LoginAction, LoginState } from './login';
import { ParametersAction, ParametersState } from './parameters';
import { projectsAction, projectsState } from './projects';
import { userAction, userState } from './user';

export type RootState = Readonly<{
  lead: LeadState;
  login: LoginState & PersistPartial;
  parameters: ParametersState & PersistPartial;
  projects: projectsState;
  auditResults: auditResultsState;
  user: userState;
  content: ContentState & PersistPartial;
}>;
// This type allows url fetching from anywhere without modifying the RootState
export type RootStateWithRouter = RootState & Readonly<{ router: RouterState }>;

export type RootAction =
  | LeadAction
  | LoginAction
  | ParametersAction
  | projectsAction
  | auditResultsAction
  | userAction
  | ContentAction;
