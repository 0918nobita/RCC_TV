import { take, call, put } from 'redux-saga/effects';
import axios, { AxiosAdapter } from 'axios';

import { VODActionTypes, success, fail } from '@/store/vod/actions';

interface GetVideo {
  id: string;
  title: string;
  desc: string;
  url: string;
}

const getVideo = async (videoId: string, adapter?: AxiosAdapter) => {
  try {
    const { data } = await axios.get<GetVideo>(
      `http://localhost:8080/video/${videoId}`,
      { adapter }
    );
    return { result: data };
  } catch (e) {
    return { err: e };
  }
};

export function* getVideoMetadata(videoId: string) {
  yield take(VODActionTypes.RequestVideo);

  const { result, err }: { result?: GetVideo; err?: any } = yield call(
    getVideo,
    videoId
  );

  if (result && !err) {
    yield put(success(result));
  } else {
    yield put(fail(err));
  }
}
