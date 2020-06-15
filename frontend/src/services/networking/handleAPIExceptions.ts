/* eslint-disable @typescript-eslint/no-explicit-any */
import { call } from 'redux-saga/effects';

export const handleAPIExceptions = (
  saga: any,
  handler: (error: Error, actionPayload: Record<string, any>) => void,
) =>
  function* wrappedSaga(...args: any[]) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
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
