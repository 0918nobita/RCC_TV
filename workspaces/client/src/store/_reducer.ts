import { combineReducers } from 'redux';
import { reducer as counterReducer } from './counter/reducer';

export const reducer = combineReducers({
  counter: counterReducer,
});
