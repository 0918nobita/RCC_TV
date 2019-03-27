import { VODState } from './vod/state';
import { LiveState } from './live/state';

export interface GlobalState {
  vod: VODState;
  live: LiveState;
}
