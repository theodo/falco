import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { fetchUserSuccess, updateUsername } from './actions';

export type AvatarAction = ActionType<typeof updateUsername | typeof fetchUserSuccess>;

export type AvatarState = Readonly<{
  userAvatarUrl: string | null;
  username: string | null;
}>;

const initialState: AvatarState = {
  userAvatarUrl: null,
  username: null,
};

const reducer = (state: AvatarState = initialState, action: AnyAction) => {
  const typedAction = action as AvatarAction;

  switch (action.type) {
    case getType(updateUsername):
      return {
        ...state,
        username: action.payload.username,
      };
    case getType(fetchUserSuccess):
      return {
        ...state,
        userAvatarUrl: action.payload.user.avatar_url,
      };
    default:
      return state;
  }
};

export default reducer;
