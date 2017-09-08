import React from 'react';
import { render } from 'react-dom';
import { Container } from 'cerebral/react';

import App from 'client/App';
import controller from './controller';

render(
  // Wrap the app in a cerebral-container so that cerebral controlls it
  <Container controller={controller}>
    <App />
  </Container>,
  document.querySelector('#app')
);
