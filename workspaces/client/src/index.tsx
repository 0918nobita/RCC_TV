import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './store/_reducer';
import VODContainer from './containers/vodContainer';
import rootSaga from '@/sagas/root';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware, createLogger()));

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <VODContainer></VODContainer>
  </Provider>,
  document.getElementById('root')
);
