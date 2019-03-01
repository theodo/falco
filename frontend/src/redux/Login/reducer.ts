import { AnyAction, Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { loginUserError, loginUserSuccess } from './actions';

export type LoginAction = ActionType<typeof loginUserSuccess | typeof loginUserError>;

export type LoginState = Readonly<{
  token: string | null;
  loginError: string | null;
}>;

const initialState: LoginState = { token: null, loginError: null };

const reducer = (state: LoginState = initialState, action: AnyAction) => {
  const typedAction = action as LoginAction;
  switch (typedAction.type) {
    case getType(loginUserSuccess):
      return {
        ...state,
        token: typedAction.payload.token,
      };
    case getType(loginUserError):
      return {
        ...state,
        loginError: typedAction.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default reducer;
