import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './store/_reducer';
import LiveContainer from './containers/liveContainer';
import VODContainer from './containers/vodContainer';
import rootSaga from '@/sagas/root';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, createLogger())
);

sagaMiddleware.run(rootSaga);

const TopPage = () => (
  <div>
    <LiveContainer />
    <VODContainer />
  </div>
);

const LoginPage = () => (
  <div>
    <p>ログイン</p>
  </div>
);

render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={TopPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
