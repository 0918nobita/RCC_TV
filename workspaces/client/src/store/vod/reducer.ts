import { initialVODState } from './state';
import { VODActionTypes, VODAction } from './actions';

export const reducer = (state = initialVODState, action: VODAction) => {
  switch (action.type) {
    case VODActionTypes.RequestVideo:
      return state;
    case VODActionTypes.Success: {
      const { videoMetadata } = action.payload;
      return Object.assign({}, state, { video: videoMetadata });
    }
    case VODActionTypes.Fail:
    default:
      return state;
  }
};
