import { VideoMetadata } from "@/models/videoMetadata";

export enum VODActionTypes {
  RequestVideo = 'vod/request',
  Success = 'vod/succeed in requesting',
  Fail = 'vod/fail in requesting',
}

type RequestVideo = { type: VODActionTypes.RequestVideo };

export const requestVideo = ()=> ({
  type: VODActionTypes.RequestVideo
});

type Success = { type: VODActionTypes.Success, payload: { videoMetadata: VideoMetadata } };

export const success = (videoMetadata: VideoMetadata): Success => ({
  type: VODActionTypes.Success,
  payload: { videoMetadata },
});

type Fail = { type: VODActionTypes.Fail, payload: { message: string } };

export const fail = (message: string): Fail => ({
  type: VODActionTypes.Fail,
  payload: { message }
});

export type VODAction = RequestVideo | Success | Fail;

export const actions = { requestVideo, success, fail };

export type actionsType = typeof actions;
