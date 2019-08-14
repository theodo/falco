import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { signUpUserClearError, signUpUserError, signUpUserRequest, signUpUserSuccess } from './actions';

export type SignUpAction = ActionType<typeof signUpUserSuccess | typeof signUpUserError |  typeof signUpUserRequest | typeof signUpUserClearError | typeof signUpUserRequest>;

export type SignUpState = Readonly<{
  signUpError: string | null;
  isSubmitting: boolean;
}>;

const initialState: SignUpState = { signUpError: null, isSubmitting: false };

const reducer = (state: SignUpState = initialState, action: AnyAction) => {
  const typedAction = action as SignUpAction;
  switch (typedAction.type) {
    case getType(signUpUserRequest):
      return {
        ...state,
        isSubmitting: true,
      };
    case getType(signUpUserSuccess):
      return {
        ...state,
        isSubmitting: false,
      };
    case getType(signUpUserError):
      return {
        ...state,
        signUpError: typedAction.payload.errorMessage,
        isSubmitting: false,
      };
    case getType(signUpUserClearError):
      return {
        ...state,
        signUpError: initialState.signUpError,
      };
    default:
      return state;
  }
};

export default reducer;
