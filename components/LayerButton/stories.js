import React from 'react';
import { storiesOf } from '@storybook/react';

import LayerButton from './index';

storiesOf('LayerButton', module).add('Active', () => (
  <LayerButton>{'Hello'}</LayerButton>
));

storiesOf('LayerButton', module).add('Inactive', () => (
  <LayerButton inactive>{'Hello'}</LayerButton>
));
