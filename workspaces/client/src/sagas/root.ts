import { fork } from 'redux-saga/effects';
import { getVideoMetadata } from './getVideoMetadata'

export default function* rootSaga() {
  yield fork(getVideoMetadata, 'Th1s1sV1De0iD');
}
