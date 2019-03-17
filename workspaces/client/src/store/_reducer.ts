import { combineReducers } from 'redux';
import { reducer as vodReducer } from './vod/reducer';

export const reducer = combineReducers({
  vod: vodReducer,
});
