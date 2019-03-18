import { initialLiveState } from './state';
import { LiveActionTypes, VODAction } from './actions';

export const reducer = (state = initialLiveState, action: VODAction) => {
  switch (action.type) {
    case LiveActionTypes.Start:
      return state;
    case LiveActionTypes.OnMessage:
      const { count } = action.payload;
      return Object.assign({}, state, { count });
    case LiveActionTypes.Fail:
    default:
      return state;
  }
};
