import React from 'react';
import { storiesOf } from '@storybook/react';

import Typ20 from './index';

storiesOf('Typ20', module).add('With text', () => <Typ20>{'Hello'}</Typ20>);
