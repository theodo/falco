import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { createLeadError, createLeadRequest, createLeadSuccess } from './actions';

export type LeadAction = ActionType<typeof createLeadError | typeof createLeadRequest |  typeof createLeadSuccess>;

export type LeadState = Readonly<{ leadSubmission: string|null }>;

const initialState: LeadState = { leadSubmission: null };

const reducer = (state: LeadState = initialState, action: AnyAction) => {
  const typedAction = action as LeadAction;
  switch (typedAction.type) {
    case getType(createLeadRequest):
      return {
        ...state,
        leadSubmission: 'running',
      };
    case getType(createLeadSuccess):
      return {
        ...state,
        leadSubmission: 'success',
      };
    case getType(createLeadError):
      return {
        ...state,
        leadSubmission: 'failed',
      };
    default:
      return state;
  }
};

export default reducer;
