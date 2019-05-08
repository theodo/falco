import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { fetchUserError, fetchUserRequest, fetchUserSuccess } from './actions';

export type userAction = ActionType<typeof fetchUserError | typeof fetchUserRequest | typeof fetchUserSuccess>;

export type userState = Readonly<{
  firstName: string;
  lastName: string;
  emailAddress: string;
} | null>;

const initialState: userState = null;

const reducer = (state: userState = initialState, action: AnyAction) => {
  const typedAction = action as userAction;
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
