import { call } from '@redux-saga/core/effects';

export function* exampleSaga() {
  console.log('Hello, sagas!');
  yield 'value';
  return 0;
}

export function* getVideoMetadata(videoId: string) {
  const { url, title, desc } = yield call(async () => (await fetch(`http://localhost:8080/video/${videoId}`)).json());
  console.log({ url, title, desc });
}
