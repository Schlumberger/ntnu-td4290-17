import React from 'react';
import { storiesOf } from '@storybook/react';

import Typ16 from './index';

storiesOf('Typ16', module).add('With text', () => <Typ16>{'Hello'}</Typ16>);
