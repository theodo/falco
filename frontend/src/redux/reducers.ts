// @flow
/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { LocationChangeAction, RouterState } from 'connected-react-router';
import { AnyAction, combineReducers, Reducer } from 'redux';

import { reducer as avatar } from './Avatar';
import { reducer as login } from './Login';
import { reducer as projects } from './projects';
import { reducer as pages } from './pages';
import { RootAction, RootState } from './types';

/**
 * Example of the Avatar module which should export a reducer.
 */

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers: {
  router: Reducer<RouterState, LocationChangeAction>;
}) {
  return combineReducers<RootState, RootAction>({
    ...asyncReducers,
    login,
    avatar,
    projects,
    pages,
  });
}
