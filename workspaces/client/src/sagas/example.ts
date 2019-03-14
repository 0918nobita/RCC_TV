import { call } from '@redux-saga/core/effects';

export function* exampleSaga() {
  console.log('Hello, sagas!');
  yield 'value';
  return 0;
}

export function* callExampleAPI() {
  const result = yield call(async () => (await fetch('http://localhost:8080')).json());
  console.log({ result });
}
