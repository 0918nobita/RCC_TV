import { CounterState } from './counter/state';
import { VODState } from './vod/state';

export interface GlobalState {
  counter: CounterState;
  vod: VODState;
}
