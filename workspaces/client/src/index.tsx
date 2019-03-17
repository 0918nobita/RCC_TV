import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './store/_reducer';
import VODContainer from './containers/vodContainer';
import { getVideoMetadata } from '@/sagas/getVideoMetadata';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(getVideoMetadata, 'videoId');

render(
  <Provider store={store}>
    <VODContainer></VODContainer>
  </Provider>,
  document.getElementById('root')
);
