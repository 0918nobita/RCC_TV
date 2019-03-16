import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './store/_reducer';
import PlayerComponent from './player';
import CounterContainer from './containers/counterContainer';
import { exampleSaga, getVideoMetadata } from '@/sagas/example';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(exampleSaga);
sagaMiddleware.run(getVideoMetadata, 'videoId');

const MEDIA_STORAGE = 'http://localhost:3000';

render(
  <Provider store={store}>
    <CounterContainer />
    <PlayerComponent src={`${MEDIA_STORAGE}/video.m3u8`} />
  </Provider>,
  document.getElementById('root')
);
