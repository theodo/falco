import { createLeadError, createLeadRequest, createLeadSuccess } from '../actions';
import reducer from '../reducer';

const email = 'thanos@titan.universe';
const initialState = { leadSubmission: null };
const stateDuringLeadSubmission = { leadSubmission: 'running' };
const stateDuringLeadSubmissionSuccess = { leadSubmission: 'success' };
const stateDuringLeadSubmissionError = { leadSubmission: 'failed' };

describe('Lead reducer', () => {
  describe('CREATE_LEAD_REQUEST case', () => {
    it("Should return a state with leadSubmission field set to 'running'", () => {
      const action = createLeadRequest({
        email,
      });

      expect(reducer(initialState, action)).toEqual(stateDuringLeadSubmission);
    });
  });

  describe('CREATE_LEAD_SUCCESS case', () => {
    it("Should return a state with leadSubmission field set to 'success'", () => {
      const action = createLeadSuccess({});

      expect(reducer(stateDuringLeadSubmission, action)).toEqual(stateDuringLeadSubmissionSuccess);
    });
  });

  describe('CREATE_LEAD_ERROR case', () => {
    it("Should return a state with leadSubmission field set to 'failed'", () => {
      const errorMessage = 'Lead not saved';
      const action = createLeadError({ errorMessage });

      expect(reducer(stateDuringLeadSubmission, action)).toEqual(stateDuringLeadSubmissionError);
    });
  });
});
