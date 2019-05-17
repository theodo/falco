import { AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { MetricType } from 'redux/auditResults/types';
import { updateDisplayedMetrics } from './actions';

export type parametersAction = ActionType<typeof updateDisplayedMetrics>;

export type parametersState = Readonly<{
  displayedMetrics: MetricType[];
}>;

const initialState: parametersState = {
  displayedMetrics: [
    'WPTMetricFirstViewTTI',
    'WPTMetricFirstViewSpeedIndex',
    'WPTMetricFirstViewLoadTime',
  ],
};

const reducer = (state: parametersState = initialState, action: AnyAction) => {
  const typedAction = action as parametersAction;
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

export default reducer;
