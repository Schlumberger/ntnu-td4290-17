import React from 'react';

import {
  Wrapper,
  SideMenu,
  HeaderMenu,
  Visualization,
  Footer
} from './elements';

export default class App extends React.Component {
  render() {
    return (
      <Wrapper>
        <HeaderMenu />
        <SideMenu />
        <Visualization />
        <Footer />
      </Wrapper>
    );
  }
}
