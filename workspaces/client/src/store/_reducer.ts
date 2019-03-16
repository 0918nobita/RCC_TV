import { combineReducers } from 'redux';
import { reducer as counterReducer } from './counter/reducer';
import { reducer as vodReducer } from './vod/reducer';

export const reducer = combineReducers({
  vod: vodReducer,
  counter: counterReducer,
});
