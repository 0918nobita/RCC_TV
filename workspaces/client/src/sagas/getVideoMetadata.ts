import { take, call } from 'redux-saga/effects';
import axios from 'axios';

import { VODActionTypes } from '@/store/vod/actions';

interface GetVideo {
  title: string;
  desc: string;
  url: string;
}

const getVideo = async (videoId: string) => {
  try {
    const { data } = await axios.get<GetVideo>(`http://localhost:8080/video/${videoId}`);
    return { result: data };
  } catch (e) {
    return { err: e };
  }
}

export function* getVideoMetadata(videoId: string) {
  yield take(VODActionTypes.RequestVideo);

  const { result, err }: { result?: GetVideo; err?: any } = yield call(getVideo, videoId);

  if (result && !err) {
    console.log('成功', { result });
  } else {
    console.log('失敗', { err });
  }
}
