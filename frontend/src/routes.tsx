import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Front = lazy(() => import('./pages/Front'));
const Projects = lazy(() => import('./pages/Projects'));

interface RouteDefinition {
  path: string;
  component: React.FunctionComponent<any>;
  exact: boolean;
  strict: boolean;
}

export const routeDefinitions: Record<string, RouteDefinition> = {
  home: {
    path: '/',
    component: Home,
    exact: true,
    strict: false,
  },
  login: {
    path: '/login',
    component: Login,
    exact: true,
    strict: true,
  },
  projectsList: {
    path: '/projects',
    component: Projects,
    exact: true,
    strict: true,
  },
  projectDetails: {
    path: '/project/:projectId/front',
    component: Front,
    exact: false,
    strict: false,
  },
};

const routes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      {Object.keys(routeDefinitions).map(key => (
        <Route
          exact={routeDefinitions[key].exact}
          strict={routeDefinitions[key].strict}
          path={routeDefinitions[key].path}
          component={routeDefinitions[key].component}
        />
      ))}
    </Switch>
  </Suspense>
);

export default routes;
