import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { fetchUserError, fetchUserRequest, fetchUserSuccess } from './actions';

export type UserAction = ActionType<typeof fetchUserError | typeof fetchUserRequest | typeof fetchUserSuccess>;

export type UserState = Readonly<{
  firstName: string;
  lastName: string;
  emailAddress: string;
  username: string;
} | null>;

const initialState: UserState = null;

const reducer = (state: UserState = initialState, action: AnyAction) => {
  const typedAction = action as UserAction;
  switch (typedAction.type) {
    case getType(fetchUserRequest):
      return initialState;
    case getType(fetchUserSuccess):
      return {
        ...action.payload,
      };
    case getType(fetchUserError):
      return initialState;
    default:
      return state;
  }
};

export default reducer;
