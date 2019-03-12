import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { reducer } from './store/_reducer';
import PlayerComponent from './player';
import CounterContainer from './containers/counterContainer';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <CounterContainer />
    <PlayerComponent src={'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'} />
  </Provider>,
  document.getElementById('root')
);
