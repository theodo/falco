import { AnyAction } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ActionType, getType } from 'typesafe-actions';

import { MetricType } from 'redux/auditResults/types';
import { updateDisplayedMetrics } from './actions';

export type ParametersAction = ActionType<typeof updateDisplayedMetrics>;

export type ParametersState = Readonly<{
  displayedMetrics: MetricType[];
}>;

const persistConfig = {
  key: 'parameters',
  whitelist: ['displayedMetrics'],
  blacklist: [],
  storage,
};

const initialState: ParametersState = {
  displayedMetrics: [
    'WPTMetricFirstViewTTI',
    'WPTMetricFirstViewSpeedIndex',
    'WPTMetricFirstViewLoadTime',
  ],
};

const reducer = (state: ParametersState = initialState, action: AnyAction) => {
  const typedAction = action as ParametersAction;
  switch (typedAction.type) {
    case getType(updateDisplayedMetrics):
      return {
        ...state,
        displayedMetrics: action.payload.displayedMetrics,
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
