import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './store/_reducer';
import PlayerComponent from './player';
import CounterContainer from './containers/counterContainer';
import { exampleSaga } from './sagas/example';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(exampleSaga);

render(
  <Provider store={store}>
    <CounterContainer />
    <PlayerComponent src={'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'} />
  </Provider>,
  document.getElementById('root')
);
