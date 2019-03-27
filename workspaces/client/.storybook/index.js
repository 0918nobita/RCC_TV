import * as React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('button', module)
  .add('default', () => (<button>サンプル</button>))
  .add('with color', () => (<button style={{color: 'blue'}}>サンプル</button>));
