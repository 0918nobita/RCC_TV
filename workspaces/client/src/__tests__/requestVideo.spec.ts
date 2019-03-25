import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

import { reducer } from '@/store/_reducer';
import { GlobalState } from '@/store/_state';
import { requestVideo } from '@/store/vod/actions';
import { getVideoMetadata } from '@/sagas/getVideoMetadata';

test('getVideoMetadata', async () => {
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

  const testAction = () =>
    new Promise(resolve => {
      store.subscribe(() => {
        const actions = store.getActions();
        if (actions.length >= 2) resolve(actions);
      });
    });

  await expect(testAction()).resolves.toEqual([
    { type: 'vod/request' },
    {
      type: 'vod/succeed in requesting',
      payload: {
        videoMetadata: {
          id: 'Th1s1sV1De0iD',
          url: 'http://localhost:3000/video.m3u8',
          title: 'サンプルのビデオ',
          desc: '説明文',
        },
      },
    },
  ]);
});
