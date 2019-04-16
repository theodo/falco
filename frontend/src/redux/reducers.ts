/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { LocationChangeAction, RouterState } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';

import { reducer as auditResults } from './auditResults';
import { reducer as login } from './login';
import { reducer as pages } from './pages';
import { reducer as projects } from './projects';
import { reducer as scripts } from './scripts';
import { RootAction, RootState } from './types';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers: {
  router: Reducer<RouterState, LocationChangeAction>;
}) {
  return combineReducers<RootState, RootAction>({
    ...asyncReducers,
    login,
    projects,
    pages,
    scripts,
    auditResults,
  });
}
