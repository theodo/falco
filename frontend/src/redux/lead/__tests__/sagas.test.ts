import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { getType } from 'typesafe-actions';

import { makePostRequest } from 'services/networking/request';

import { createLeadError, createLeadRequest, createLeadSuccess } from '../actions';
import { createLead } from '../sagas';

const createLeadRequestAction = createLeadRequest({
  email: 'thanos@titan.universe',
});

describe('[Saga] Create Lead', () => {
  describe('createLead', () => {
    describe('when request is a success', () => {
      it('should call the success action', async () => {
        return expectSaga(createLead, createLeadRequestAction)
          .provide([[matchers.call.fn(makePostRequest), {}]])
          .put(createLeadSuccess({}))
          .run(1250);
      });
    });

    describe('when request fails', () => {
      it('should call the error action', async () => {
        const error = new Error();
        return expectSaga(createLead, createLeadRequestAction)
          .provide([[matchers.call.fn(makePostRequest), throwError(error)]])
          .put(createLeadError({ errorMessage: error.message }))
          .not.put.actionType(getType(createLeadSuccess))
          .run(1250);
      });
    });
  });
});
