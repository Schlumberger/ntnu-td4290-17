import React from 'react';
import { storiesOf } from '@storybook/react';

import Viz from './index';

storiesOf('Viz', module).add('With data', () => (
  <div style={{ width: '100%', height: '400px' }}>
    <Viz data={['Hello']} />
  </div>
));
