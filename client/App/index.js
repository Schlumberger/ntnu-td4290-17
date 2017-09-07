import React from 'react';

import {
  Wrapper,
  SideMenu,
  HeaderMenu,
  Visualization,
  Footer
} from './elements';

import Header from './Header'

export default class App extends React.Component {
  render() {
    return (
      <Wrapper>
        <HeaderMenu>
          <Header />
        </HeaderMenu>
        <SideMenu />
        <Visualization data={['test']} />
        <Footer />
      </Wrapper>
    );
  }
}
