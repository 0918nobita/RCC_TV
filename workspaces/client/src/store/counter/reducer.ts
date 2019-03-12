import { initialCounterState } from './state';
import { CounterActionTypes, CounterAction } from './actions';

export const reducer = (state = initialCounterState, action: CounterAction) => {
  switch (action.type) {
    case CounterActionTypes.INC:
      return Object.assign({}, state, { count: state.count + 1 });
    case CounterActionTypes.DEC:
      return Object.assign({}, state, { count: state.count - 1 });
    default:
      return state;
  }
};
