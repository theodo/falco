import { AnyAction } from 'redux';
import { ActionType } from 'typesafe-actions';

import { createLeadError, createLeadRequest, createLeadSuccess } from './actions';

export type LeadAction = ActionType<typeof createLeadError | typeof createLeadRequest |  typeof createLeadSuccess>;

export type LeadState = Readonly<{}>;

const initialState: LeadState = {};

const reducer = (state: LeadState = initialState, action: AnyAction) => {
  const typedAction = action as LeadAction;
  switch (typedAction.type) {
    default:
      return state;
  }
};

export default reducer;
