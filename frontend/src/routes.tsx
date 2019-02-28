import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Front = lazy(() => import('./pages/Front'));
const Projects = lazy(() => import('./pages/Projects'));

const routes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/projects" component={Projects} />
      <Route path="/project/:projectId/front" component={Front} />
    </Switch>
  </Suspense>
);

export default routes;
