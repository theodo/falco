import { AnyAction } from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ActionType, getType } from 'typesafe-actions';

import { loginUserClearError, loginUserError, loginUserRequest, loginUserSuccess, logoutUserRequest } from './actions';

export type LoginAction = ActionType<typeof loginUserSuccess | typeof loginUserError |  typeof loginUserRequest | typeof loginUserClearError | typeof logoutUserRequest>;

export type LoginState = Readonly<{
  isAuthenticated: boolean;
  loginError: string | null;
  isSubmitting: boolean;
}>;

const persistConfig = {
  key: 'login',
  whitelist: ['isAuthenticated'],
  blacklist: ['loginError', 'isSubmitting'],
  storage,
};

const initialState: LoginState = { isAuthenticated: false, loginError: null, isSubmitting: false };

const reducer = (state: LoginState = initialState, action: AnyAction) => {
  const typedAction = action as LoginAction;
  switch (typedAction.type) {
    case getType(loginUserRequest):
      return {
        ...state,
        isAuthenticated: false,
        isSubmitting: true,
      };
    case getType(loginUserSuccess):
      return {
        ...state,
        isAuthenticated: true,
        isSubmitting: false,
      };
    case getType(loginUserError):
      return {
        ...state,
        isAuthenticated: false,
        loginError: typedAction.payload.errorMessage,
        isSubmitting: false,
      };
    case getType(loginUserClearError):
      return {
        ...state,
        loginError: initialState.loginError,
      };
    case getType(logoutUserRequest):
      return initialState;
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
