/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { LocationChangeAction, RouterState } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import toastr from 'react-redux-toastr/lib/reducer';
import { reducer as auditResults } from './auditResults';
import { reducer as entities } from './entities';
import { reducer as login } from './login';
import { reducer as parameters } from './parameters';
import { reducer as signUp } from './sign-up';
import { reducer as user } from './user';

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
    parameters,
    entities,
    auditResults,
    user,
    signUp,
    toastr,
  });
}
