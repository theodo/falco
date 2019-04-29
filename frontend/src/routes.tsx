import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import { RootState } from 'redux/types';

import { selectIsAuthenticated } from 'redux/login/selectors';

const Audits = lazy(() => import('./pages/Audits'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Front = lazy(() => import('./pages/Front'));
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
  home: {
    path: '/',
    component: Home,
    exact: true,
    strict: false,
    isAuthenticated: true,
  },
  login: {
    path: '/login',
    component: Login,
    exact: true,
    strict: true,
    isAuthenticated: false,
  },
  projectsList: {
    path: '/projects',
    component: Projects,
    exact: true,
    strict: true,
    isAuthenticated: true,
  },
  projectDetails: {
    path: '/project/:projectId/front',
    component: Front,
    exact: false,
    strict: false,
    isAuthenticated: true,
  },
  auditsDetails: {
    path: '/project/:projectId/audits',
    component: Audits,
    exact: false,
    strict: false,
    isAuthenticated: true,
  },
};

const routes: React.FunctionComponent<RouteProps> = props => (
  <Suspense fallback={<div>Loading...</div>}>
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
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default routes;
