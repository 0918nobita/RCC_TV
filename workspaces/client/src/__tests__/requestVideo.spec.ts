import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

import { reducer } from '@/store/_reducer';
import { GlobalState } from '@/store/_state';
import { requestVideo } from '@/store/vod/actions';
import { getVideoMetadata } from '@/sagas/getVideoMetadata';

test('getVideoMetadata', () => {
  const sagaMiddleware = createSagaMiddleware();
  const mockStore = configureStore<GlobalState>([sagaMiddleware]);
  const store = mockStore();
  store.replaceReducer(reducer);
  sagaMiddleware.run(getVideoMetadata, 'videoId', async () => ({
    data: {
      id: 'Th1s1sV1De0iD',
      url: 'http://localhost:3000/video.m3u8',
      title: 'サンプルのビデオ',
      desc: '説明文',
    },
    status: 200,
    headers: [],
    statusText: '',
    config: {},
  }));

  store.dispatch(requestVideo());

  setTimeout(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: 'vod/request!' });
  }, 4);
});
