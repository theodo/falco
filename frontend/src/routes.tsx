import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import { RootState } from 'redux/types';

import Loader from 'components/Loader';
import { NotFoundComponent } from 'components/Root/components';
import { getIsAuthenticated } from 'redux/login/selectors';

const Audits = lazy(() => import('./pages/Audits'));
const Login = lazy(() => import('./pages/User/Login'));
const SignUp = lazy(() => import('./pages/User/SignUp'));
const Project = lazy(() => import('./pages/Project'));
const Projects = lazy(() => import('./pages/Projects'));
const GeneralSettings = lazy(() => import('./pages/GeneralSettings'));
const EnvironmentSettings = lazy(() => import('./pages/EnvironmentSettings'));
const PagesAndScriptsSettings = lazy(() => import('./pages/PagesAndScriptsSettings'));
const MembersSettings = lazy(() => import('./pages/MembersSettings'));

interface RouteDefinition {
  path: string;
  component: React.FunctionComponent<any>;
  exact: boolean;
  strict: boolean;
  isAuthenticated: boolean;
  id?: string;
}

interface RouteProps {
  store: RootState;
}

export const routeDefinitions: Record<string, RouteDefinition> = {
  landing: {
    path: '/',
    component: Login,
    exact: true,
    strict: false,
    isAuthenticated: false,
  },
  login: {
    path: '/login',
    component: Login,
    exact: true,
    strict: false,
    isAuthenticated: false,
  },
  signUp: {
    path: '/sign-up',
    component: SignUp,
    exact: true,
    strict: false,
    isAuthenticated: false,
  },
  projectsList: {
    path: '/projects',
    component: Projects,
    exact: true,
    strict: false,
    isAuthenticated: true,
  },
  projectDetails: {
    path: '/project/:projectId',
    component: Project,
    exact: true,
    strict: false,
    isAuthenticated: true,
  },
  projectSettingsGeneral: {
    path: '/project/:projectId/settings/general',
    component: GeneralSettings,
    exact: true,
    strict: false,
    isAuthenticated: true,
    id: 'ProjectSettings.general_settings'
  },
  environmentSettings: {
    path: '/project/:projectId/settings/environment',
    component: EnvironmentSettings,
    exact: true,
    strict: false,
    isAuthenticated: true,
    id: 'ProjectSettings.project_audit_parameters'
  },
  pagesAndScriptsSettings: {
    path: '/project/:projectId/settings/pages-scripts',
    component: PagesAndScriptsSettings,
    exact: true,
    strict: false,
    isAuthenticated: true,
    id: 'ProjectSettings.pages_and_scripts'
  },
  membersSettings: {
    path: '/project/:projectId/settings/members',
    component: MembersSettings,
    exact: true,
    strict: false,
    isAuthenticated: true,
    id: 'ProjectSettings.project_members'
  },
  auditsDetails: {
    path: '/project/:projectId/audits/:pageOrScriptId/audit-parameters/:auditParametersId',
    component: Audits,
    exact: true,
    strict: false,
    isAuthenticated: true,
  },
  auditsScriptDetails: {
    path:
      '/project/:projectId/audits/:pageOrScriptId/audit-parameters/:auditParametersId/step/:scriptStepId',
    component: Audits,
    exact: true,
    strict: false,
    isAuthenticated: true,
  },
};

const routes: React.FunctionComponent<RouteProps> = props => (
  <Suspense fallback={<Loader />}>
    <Switch>
      {Object.keys(routeDefinitions).map(key => {
        if (routeDefinitions[key].isAuthenticated) {
          return (
            <PrivateRoute
              key={key}
              exact={routeDefinitions[key].exact}
              strict={routeDefinitions[key].strict}
              path={routeDefinitions[key].path}
              component={routeDefinitions[key].component}
              store={props.store}
            />
          );
        }
        return (
          <Route
            key={key}
            exact={routeDefinitions[key].exact}
            strict={routeDefinitions[key].strict}
            path={routeDefinitions[key].path}
            component={withRouter(routeDefinitions[key].component)}
          />
        );
      })}
      <Route component={NotFoundComponent} />
    </Switch>
  </Suspense>
);

const PrivateRoute = ({ component, store, ...other }: any) => {
  const RouteComponent = component;
  return (
    <Route
      {...other}
      render={props =>
        getIsAuthenticated(store) ? (
          <RouteComponent {...props} />
        ) : (
            <Redirect
              to={{
                pathname: routeDefinitions.landing.path,
                state: { from: props.location.pathname },
              }}
            />
          )
      }
    />
  );
};

export default routes;
