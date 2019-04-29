import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';

export const handleAPIExceptions = (
  saga: (action: ActionType<any>) => SagaIterator,
  handler: (error: Error, actionPayload: Record<string, any>) => void,
) =>
  function* wrappedSaga(...args: any[]) {
    try {
      // @ts-ignore
      yield call(saga, ...args);
    } catch (error) {
      if (handler) {
        yield call(handler, error, args[0].payload);
      } else {
        throw error;
      }
    }
  };
