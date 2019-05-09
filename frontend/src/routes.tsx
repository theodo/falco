import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import { RootState } from 'redux/types';

import Loader from 'components/Loader';
import { selectIsAuthenticated } from 'redux/login/selectors';

const Audits = lazy(() => import('./pages/Audits'));
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Project = lazy(() => import('./pages/Project'));
const Projects = lazy(() => import('./pages/Projects'));

interface RouteDefinition {
  path: string;
  component: React.FunctionComponent<any>;
  exact: boolean;
  strict: boolean;
  isAuthenticated: boolean;
}

interface RouteProps {
  store: RootState;
}

export const routeDefinitions: Record<string, RouteDefinition> = {
  landing: {
    path: '/',
    component: Landing,
    exact: true,
    strict: false,
    isAuthenticated: true,
  },
  login: {
    path: '/login',
    component: Login,
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
  auditsDetails: {
    path: '/project/:projectId/audits/:pageOrScriptId',
    component: Audits,
    exact: true,
    strict: false,
    isAuthenticated: true,
  },
  auditsScriptDetails: {
    path: '/project/:projectId/audits/:pageOrScriptId/step/:scriptStepId',
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
    </Switch>
  </Suspense>
);

const PrivateRoute = ({ component, store, ...other }: any) => {
  const RouteComponent = component;
  return (
    <Route
      {...other}
      render={props =>
        selectIsAuthenticated(store) ? (
          <RouteComponent {...props} />
        ) : (
          <Redirect
            to={{
              pathname: routeDefinitions.login.path,
              state: { from: props.location.pathname },
            }}
          />
        )
      }
    />
  );
};

export default routes;
