import { combineReducers } from 'redux';
import { reducer as vodReducer } from './vod/reducer';
import { reducer as liveReducer } from './live/reducer';

export const reducer = combineReducers({
  vod: vodReducer,
  live: liveReducer,
});
