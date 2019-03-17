import { call } from 'redux-saga/effects';

export function* getVideoMetadata(videoId: string) {
  const { url, title, desc } = yield call(async () => (await fetch(`http://localhost:8080/video/${videoId}`)).json());
  console.log({ url, title, desc });
}
