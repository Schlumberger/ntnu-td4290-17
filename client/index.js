import React from 'react';
import { render } from 'react-dom';
import { Container } from '@cerebral/react';

import App from 'client/App';
import controller from './controller';

render(
  <Container controller={controller}>
    <App />
  </Container>,
  document.querySelector('#app')
);
