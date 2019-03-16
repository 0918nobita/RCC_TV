import { Nullable } from 'option-t/lib/Nullable';
import { VideoMetadata } from '@/models/videoMetadata';

export interface VODState {
  video: Nullable<VideoMetadata>;
}

export const initialVODState: VODState = {
  video: null,
};
