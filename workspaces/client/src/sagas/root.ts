import { fork } from 'redux-saga/effects';
import { getVideoMetadata } from './getVideoMetadata';
import { sseTest } from './sseTest';

export default function* rootSaga() {
  yield fork(getVideoMetadata, '1');
  yield fork(sseTest);
}
