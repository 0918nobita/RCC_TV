import * as React from 'react';
import * as ReactDOM from 'react-dom';

import PlayerComponent from './player';

const container = document.getElementById('root');
ReactDOM.render(
  <PlayerComponent src={'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'} />,
  container
);
